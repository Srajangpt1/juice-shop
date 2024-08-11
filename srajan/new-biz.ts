// import express from 'express';
// import { exec } from 'child_process';

// const app = express();
// app.use(express.json());

// app.post('/execute', (req, res) => {
//   const command = req.body.command;
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return res.status(500).send('Server Error');
//     }
//     res.send(`stdout: ${stdout}\nstderr: ${stderr}`);
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

import express from 'express';
import { exec } from 'child_process';
import CustomRouter from './customRouter';

const app = express();
app.use(express.json());

const customRouter = new CustomRouter();

customRouter.post('/execute', (req, res) => {
  const command = req.body.command;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Server Error');
    }
    res.send(`stdout: ${stdout}\nstderr: ${stderr}`);
  });
});

app.use(customRouter.getRouter());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});