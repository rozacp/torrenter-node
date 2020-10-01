/**
 * Routes
 */

import { Router } from 'express';
import defaultController from '../controllers/defaultController';
import qualitiesController from '../controllers/qualitiesController';
import filtersController from '../controllers/filtersController';

const router = Router();

router.get('/test', defaultController.test);

router.get('/qualities', qualitiesController.index);
router.post('/qualities', qualitiesController.store);
router.patch('/qualities/:id', qualitiesController.update);
router.delete('/qualities/:id', qualitiesController.destroy);

router.get('/filters', filtersController.index);
router.post('/filters', filtersController.store);
router.patch('/filters/:id', filtersController.update);
router.delete('/filters/:id', filtersController.destroy);

export default router;
