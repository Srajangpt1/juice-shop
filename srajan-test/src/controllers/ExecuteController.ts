import { Controller, Post, Route, Body, Response, TsoaResponse } from 'tsoa';
import { exec } from 'child_process';

interface ExecuteRequest {
  command: string;
}

@Route("execute")
export class ExecuteController extends Controller {
  @Post()
  public async executeCommand(
    @Body() request: ExecuteRequest,
    @Response() res: TsoaResponse<500, { message: string }>
  ): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      exec(request.command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          res(500, { message: 'Server Error' });
          return reject(error);
        }
        resolve({ stdout, stderr });
      });
    });
  }
}