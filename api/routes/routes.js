import express from 'express';
import UserController from '../controllers/userController';


const router = express.Router();

router.post('/auth/signup', UserController.signup);
router.post('/auth/login', UserController.login);


export default router;