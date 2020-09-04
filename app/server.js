/*
  Server
*/

import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
// import { capitalize } from './helpers';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'prod';

// middleware
app.use(express.json());

// routes
app.use(router);

app.listen(port, () => console.log(`Server running in ${env} mode on port ${port}!`));
