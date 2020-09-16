/**
 * Server
 */

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/api';
import { auth, notFound, errorHandler } from './middleware';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => res.json({ message: '👋👉👌😎' }));
app.use('/api/v1', auth, api);

// no routes matched
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}!`));
