/**
 * Server
 */

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import api from './routes/api';
import { auth, notFound, errorHandler } from './middleware';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// routes
app.get('/', (req, res) => res.json({ message: '👋👉👌😎' }));
app.use('/api/v1', auth, api);
app.use(notFound);
app.use(errorHandler);

// database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(conn => {
    console.log(`Database connected: ${conn.connection.host}`);

    // start the app
    app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}!`));
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
