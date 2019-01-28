import express from 'express';
import UserController from '../controllers/userController';
import RedFlagController from '../controllers/redFlagController';
import InterventionController from '../controllers/interventionController';
import ValidateUsers from '../middlewares/validateUser';
import verifyToken from '../middlewares/verifyToken';
import PostValidator from '../middlewares/validatePost';


const router = express.Router();

router.post('/auth/signup', ValidateUsers.validateSignUp, ValidateUsers.checkIfUserExists, UserController.signup);
router.post('/auth/login', ValidateUsers.validateLogin, UserController.login);
router.post('/red-flags', verifyToken.userAuthentication, PostValidator.validatePostRecord, RedFlagController.createRedFlag);
router.post('/interventions', verifyToken.userAuthentication, PostValidator.validatePostRecord, InterventionController.createIntervention);
router.get('/red-flags', verifyToken.userAuthentication, RedFlagController.allRedFlags);
router.get('/interventions', verifyToken.userAuthentication, InterventionController.allInterventions);
router.get('/red-flags/:id', verifyToken.userAuthentication, PostValidator.validateId, RedFlagController.redFlagId);
router.get('/interventions/:id', verifyToken.userAuthentication, PostValidator.validateId, InterventionController.interventionId);
router.patch('/red-flags/:id/location', verifyToken.userAuthentication, PostValidator.validateId, PostValidator.validateLocation, RedFlagController.editRedFlag);
router.patch('/interventions/:id/location', verifyToken.userAuthentication, PostValidator.validateId, PostValidator.validateLocation, InterventionController.interventionLocation);
router.patch('/red-flags/:id/comment', verifyToken.userAuthentication, PostValidator.validateId, PostValidator.validateComment, RedFlagController.editRedFlagComment);
router.patch('/interventions/:id/comment', verifyToken.userAuthentication, PostValidator.validateId, PostValidator.validateComment, InterventionController.editInterventionComment);
router.delete('/red-flags/:id', verifyToken.userAuthentication, PostValidator.validateId, RedFlagController.deleteRedFlag);
router.delete('/interventions/:id', verifyToken.userAuthentication, PostValidator.validateId, InterventionController.deleteIntervention);
router.patch('/red-flags/:id/status', verifyToken.userAuthentication, verifyToken.adminAuthentication, PostValidator.validateId, PostValidator.validateStatus, RedFlagController.updateRedFlagStatus);
router.patch('/interventions/:id/status', verifyToken.userAuthentication, verifyToken.adminAuthentication, PostValidator.validateId, PostValidator.validateStatus, InterventionController.updateInterventionStatus);
router.get('/all-records', verifyToken.userAuthentication, InterventionController.getRedFlagAndIntervention);


export default router;