import express from 'express';
import RedFlagControllers from '../controllers/redFlagController';

const router = express.Router();

router.post('/red-flags', RedFlagControllers.createRedFlag);
router.get('/red-flags', RedFlagControllers.getAllRedFlag);
router.get('/red-flags/:id', RedFlagControllers.getRedFlagId);
router.patch('/red-flags/:id/location', RedFlagControllers.updateRedFlagLocation);

export default router;