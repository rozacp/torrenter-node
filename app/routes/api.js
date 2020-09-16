/**
 * Routes
 */

import { Router } from 'express';
import defaultController from '../controllers/defaultController';
import qualitiesController from '../controllers/qualitiesController';
import filtersController from '../controllers/filtersController';

const router = Router();

router.get('/test', defaultController.test);

router.route('/qualities(/:id)?')
  .get(qualitiesController.index)
  .post(qualitiesController.store)
  .patch(qualitiesController.update)
  .delete(qualitiesController.destroy);

router.route('/filters(/:id)?')
  .get(filtersController.index)
  .post(filtersController.store)
  .patch(filtersController.update)
  .delete(filtersController.destroy);

export default router;
