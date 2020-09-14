/**
 * Routes
 */

import { Router } from 'express';
import pagesController from '../controllers/pagesController';
import qualitiesController from '../controllers/qualitiesController';
import filtersController from '../controllers/filtersController';

const router = Router();

const auth = (req, res, next) => {
  const authorised = true;
  console.log('FAKE AUTH');

  if (!authorised) {
    return res.status(403).json({ error: 'Unauthorised!' });
  }

  return next();
};

router.get('/', pagesController.home);

// after this point all rutes use AUTH
// router.use(auth);

router.get('/dashboard', auth, pagesController.dashboardShow);
router.patch('/dashboard/:user', auth, pagesController.dashboardUpdate);
router.get('/test', auth, pagesController.test);

router.route('/qualities(/:id)?')
  .all(auth)
  .get(qualitiesController.index)
  .post(qualitiesController.store)
  .patch(qualitiesController.update)
  .delete(qualitiesController.destroy);

router.route('/filters(/:id)?')
  .all(auth)
  .get(filtersController.index)
  .post(filtersController.store)
  .patch(filtersController.update)
  .delete(filtersController.destroy);

// no routes matched
router.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default router;
