/**
 * Routes
 */

import { Router } from 'express';
import { check } from 'express-validator';
import defaultController from '../controllers/defaultController';
import qualitiesController from '../controllers/qualitiesController';
import filtersController from '../controllers/filtersController';
import validate from '../validators/validate';

const router = Router();

router.get('/test', defaultController.test);

router.get('/qualities', qualitiesController.index);
router.post('/qualities', [
  check('name')
    .notEmpty()
    .withMessage('is required'),
  check('code')
    .notEmpty()
    .withMessage('is required')
    .isNumeric()
    .withMessage('must be a number'),
  check('active')
    .notEmpty()
    .withMessage('is required')
    .isBoolean()
    .withMessage('must be boolean'),
], validate, qualitiesController.store);
router.patch('/qualities/:id', qualitiesController.update);
router.delete('/qualities/:id', qualitiesController.destroy);

router.get('/filters', filtersController.index);
router.post('/filters', filtersController.store);
router.patch('/filters/:id', filtersController.update);
router.delete('/filters/:id', filtersController.destroy);

export default router;
