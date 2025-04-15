import { Router } from "express";
import * as chatController from '../controllers/chatController'

const router = Router()

router.get('/', chatController.getMessages)
router.delete('/:messageId?', chatController.deleteMessages)
router.post('/isFavorite', chatController.setIsFavorite)

export default router