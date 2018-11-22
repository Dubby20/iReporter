import express from 'express';
import RedFlagControllers from '../controllers/redFlagController';

const router = express.Router();

router.post('/red-flag', RedFlagControllers.createRedFlag);
router.get('/red-flag', RedFlagControllers.getAllRedFlag);
router.get('/red-flag/:id', RedFlagControllers.getRedFlagId);

export default router;