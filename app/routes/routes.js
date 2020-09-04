import { Router } from 'express';
import pagesController from '../controllers/pagesController';

const router = Router();

router.get('/', pagesController.home);
router.get('/dashboard', pagesController.dashboard);
// router.post('/dashboard/:user', pagesController.saveDashboard); // NOTE: patch request
router.get('/test', pagesController.test);

export default router;
