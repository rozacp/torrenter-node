/*
  Server
*/

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes/routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

// middleware
app.use(express.json());
if (env === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use(router);

app.listen(port, () => console.log(`Server running in ${env} mode on port ${port}!`));
