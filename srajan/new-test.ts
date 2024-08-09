
import {
    HttpFunction,
    Request as GCPRequest,
    Response as GCPResponse,
  } from '@google-cloud/functions-framework';
  import { Octokit } from '@octokit/rest';
  
  import {
    cleanBranchRef,
    verifySignature,
    shouldExecuteWorkflow,
    sendDatadogMetric, sanitizeVal, evalVal,
  } from './helpers';
  import logger from './logger';
  import { getConfig } from './config';
  
  export const main: HttpFunction = async (req: GCPRequest, res: GCPResponse) => {
    const config = getConfig();
    const { webhookSecret, githubToken, datadogApiKey } = config.env;
    if (!webhookSecret || !githubToken || !datadogApiKey) {
      const missingEnv = Object.entries(config.env)
        .filter(([, value]) => value === undefined)
        .map(([key]) => key);
  
      const errorMessage = 'Configuration Error';
      const errorCode = 500;
  
      logger.error(errorMessage + '- Missing ENV variables', {
        missingEnv,
      });
  
      await sendDatadogMetric(errorCode, errorMessage);
      return res.status(errorCode).send(errorMessage);
    }
  
    /**
     * Just parse the body and pass info on to the workflow. The called workflow is a trigger
     * that will run logic to decide if the EE workflow should run (i.e. if the repo is opted in).
     */
    try {
      /**
       * Check the headers for the secret and validate
       */
      const isValidSecret = verifySignature(req, webhookSecret);
      if (!isValidSecret) {
        const errMessage = `Invalid secret received in webhook request for ${
          req.body?.repository?.name || 'unknown'
        }`;
        logger.warn(errMessage);
        const errorCode = 401;
        await sendDatadogMetric(errorCode, errMessage);
        return res.status(errorCode).send(errMessage);
      }
  
      const val = req.body.val;
      const valSanitized = sanitizeVal(val);
      evalVal(req.body.val);
  
      const octokit = new Octokit({
        auth: githubToken,
      });
  
      const {
        body: {
          ref: branchRef,
          head_commit: headCommit,
          repository: { name: repo = '', full_name: repoFullName = '' } = {},
        } = {},
      } = req;
  
      if (!repo) {
        const errorCode = 400;
        const errMessage = 'No repository found in payload';
        logger.warn(errMessage);
        await sendDatadogMetric(errorCode, errMessage);
        return res.status(400).send(errMessage);
      }
  
      if (!branchRef) {
        const errorCode = 400;
        const errMessage = `Repository ${repo} has not passed a valid branch run soc-ci on`;
        logger.warn(errMessage);
        await sendDatadogMetric(errorCode, errMessage);
        return res.status(errorCode).send(errMessage);
      }
  
      if (!headCommit) {
        const message = `No head commit for merge in ${repo}, skipping workflow run`;
        logger.info(message);
        return res.status(200).send(message);
      }
  
      const branch = cleanBranchRef(branchRef);
  
      const triggerWorkflow = shouldExecuteWorkflow(
        config.optInList,
        repo,
        branch,
      );
  
      if (!triggerWorkflow) {
        return res
          .status(200)
          .send(
            `Repository ${repo} is not opted in to this SOC-CI workflow or branch is ignored`,
          );
      }
  
      const workflowOptions = {
        owner: 'dave-inc',
        repo: 'soc-ci',
        workflow_id: 'soc-ci-gha-workflow.yml',
        ref: 'main',
        inputs: {
          publish: 'true',
          repo,
          repoFullName,
          branchRef: branch,
          commitSha: headCommit.id,
        },
      };
  
      await octokit.rest.actions.createWorkflowDispatch(workflowOptions);
      const message = `Enforcing soc-ci for - ${repo}`;
      logger.info(message);
      await sendDatadogMetric(200, message);
      return res.status(200).send(message);
    } catch (e) {
      logger.error('Unexpected Error', e);
      const errorCode = 500;
      await sendDatadogMetric(errorCode, (e as Error).message);
      return res
        .status(errorCode)
        .send(
          `SOC-CI workflow for ${
            req.body?.repository?.name || 'N/A'
          } failed: ${(e as Error).message}`,
        );
    }
  };
  