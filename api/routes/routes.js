import express from 'express';
import UserController from '../controllers/userController';
import RedFlagController from '../controllers/redFlagController';
import InterventionController from '../controllers/interventionController';
import verifyToken from '../middlewares/verifyToken';
import validateLocation from '../middlewares/validateUpdate';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);
router.post('/red-flags', verifyToken.userAuthentication, RedFlagController.createRedFlag);
router.post('/interventions', verifyToken.userAuthentication, InterventionController.createIntervention);
router.get('/red-flags', verifyToken.userAuthentication, RedFlagController.allRedFlags);
router.get('/interventions', verifyToken.userAuthentication, InterventionController.allInterventions);
router.get('/red-flags/:id', verifyToken.userAuthentication, RedFlagController.redFlagId);
router.patch('/red-flags/:id/location', verifyToken.userAuthentication, RedFlagController.editRedFlag);
router.patch('/red-flags/:id/comment', verifyToken.userAuthentication, RedFlagController.editRedFlagComment);
router.delete('/red-flags/:id', verifyToken.userAuthentication, RedFlagController.deleteRedFlag);


export default router;