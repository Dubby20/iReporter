import express from 'express';
import RedFlagControllers from '../controllers/redFlagController';

const router = express.Router();

router.post('/red-flags', RedFlagControllers.createRedFlag);
router.get('/red-flags', RedFlagControllers.getAllRedFlag);
router.get('/red-flags/:id', RedFlagControllers.getRedFlagId);
router.patch('/red-flags/:id/location', RedFlagControllers.updateRedFlagLocation);
router.patch('/red-flags/:id/comment', RedFlagControllers.updateRedFlagComment);
router.delete('/red-flags/:id', RedFlagControllers.deleteRedFlagId);

export default router;