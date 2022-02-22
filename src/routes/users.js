import { Router } from 'express';
import { register, verify, authenticate } from '../controllers/user';
import validator from '../middlewares/validator-middleware';
import { AuthenticateValidations, RegisterValidations } from '../validators';

const router = Router();

/*
*   @description  to create a new user account  
*   @api    /users/routes/register
*   @access public
*   @type   POST
*/

router.post('/register', RegisterValidations, validator, register);

/*
*   @description  to verify a new user account via email
*   @api    /users/routes/verify/:verificationCode
*   @access public <via Email>
*   @type   GET
*/

router.get('/verify/:verificationCode',verify);

/*
*   @description  to authenticate an user and get auth token
*   @api    /users/routes/authenticate
*   @access public 
*   @type   POST
*/

router.post('/authenticate',AuthenticateValidations, validator, authenticate);

export default router;