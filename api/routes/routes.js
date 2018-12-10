import express from 'express';
import UserController from '../controllers/userController';
import RedFlagControllers from '../controllers/redFlagController';
import verifyToken from '../middlewares/verifyToken';
import validateLocation from '../middlewares/validateUpdate';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/red-flags', verifyToken.userAuthentication, RedFlagControllers.createRedFlag);
router.get('/red-flags', verifyToken.userAuthentication, RedFlagControllers.allRedFlags);
router.get('/red-flags/:id', verifyToken.userAuthentication, RedFlagControllers.redFlagId);
router.patch('/red-flags/:id/location', verifyToken.userAuthentication, RedFlagControllers.editRedFlag);
router.patch('/red-flags/:id/comment', verifyToken.userAuthentication, RedFlagControllers.editRedFlagComment);
router.delete('/red-flags/:id', verifyToken.userAuthentication, RedFlagControllers.deleteRedFlag);


export default router;