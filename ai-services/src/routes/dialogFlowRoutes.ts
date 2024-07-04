import { Router, Request, Response, NextFunction } from 'express';
import dialogFlowController from '../controllers/dialogFlowController';

const router = Router();

router.post('/', dialogFlowController.sendMessage)

export default router;
