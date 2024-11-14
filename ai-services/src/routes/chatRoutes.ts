import { Router } from "express";
import * as chatController from '../controllers/chatController'
import authController from "../controllers/authController";

const router = Router()

router.get('/', authController.validateToken, chatController.getMessages)
router.delete('/:messageId?', authController.validateToken, chatController.deleteMessages)

export default router