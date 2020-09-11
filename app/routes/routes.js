/**
 * Routes
 */

import { Router } from 'express';
import pagesController from '../controllers/pagesController';
import qualitiesController from '../controllers/qualitiesController';
import filtersController from '../controllers/filtersController';

const router = Router();

router.get('/', pagesController.home);
router.get('/dashboard', pagesController.dashboard);
// router.post('/dashboard/:user', pagesController.saveDashboard); // NOTE: patch request
router.get('/test', pagesController.test);

router.get('/qualities', qualitiesController.index);
router.post('/qualities', qualitiesController.store);
router.patch('/qualities/:id', qualitiesController.update);
router.delete('/qualities/:id', qualitiesController.destroy);

router.get('/filters', filtersController.index);
router.post('/filters', filtersController.store);
router.patch('/filters/:id', filtersController.update);
router.delete('/filters/:id', filtersController.destroy);

export default router;
