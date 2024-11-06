import { Router } from 'express';
import dialogFlowController from '../controllers/dialogFlowController';
import authController from '../controllers/authController';

const router = Router();

router.post('/', authController.validateToken, dialogFlowController.sendMessage)

export default router;
