import express from 'express';
import RedFlagControllers from '../controllers/redFlagController';

const router = express.Router();

router.post('/red-flag', RedFlagControllers.createRedFlag);

export default router;