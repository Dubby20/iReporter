import express from 'express';
import UserController from '../controllers/userController';
import RedFlagControllers from '../controllers/redFlagController';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/red-flags', verifyToken.userAuthentication, RedFlagControllers.createRedFlag);
router.get('/red-flags', verifyToken.userAuthentication, RedFlagControllers.allRedFlags);


export default router;