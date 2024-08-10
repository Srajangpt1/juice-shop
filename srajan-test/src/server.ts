import express from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './routes/routes';

const app = express();
app.use(bodyParser.json());

RegisterRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});