import { join } from 'path';
// import { User } from '../models/User';
import { User } from '../models';
import { randomBytes } from 'crypto';
import { DOMAIN } from '../constants';
import sendMail from '../functions/sendMail';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { authorize } from 'passport';


export const register = async ( req,res ) => {      
    let { name, email, password }   = req.body;

    try {
          let userRecord = await User.findOne({ email: email });

          if (userRecord){
              return res.status(400).json({
                success: false,  
                message: 'email already registered...'
              });
          }

          let user = new User({
              ...req.body,
              verificationCode: randomBytes(20).toString('hex')
          });

          await user.save();

          // sent the email to the user with a verification link
          let html =`
          <h1>hi, ${user['name']}</h1>
          <p>Please click the following link to verify your account</p>
          <a href="${DOMAIN}users/verify/${user['verificationCode']}">Verify now</a>`;
      
            let msg = { 
                name: user.name,
                email: user.email,
                html: html,
                verificationCode: user.verificationCode 
            }            

            await sendMail(msg,( error,result ) => { 
                (error) ? console.log(`sendMail error occur: ${error}`) : console.log(`sendMail Success: ${result}`);
            });                


            return res.status(201).json({
                success: true,
                message: `User Email Account ${user.email} Created. please verify your email address`
            });
    } catch (error) {        
        console.log(`error user registration: ${error}`);
        return res.status(500).json({
            success: false,
            message: `error user registration ${error}`
        });
    }

}

export const verify = async ( req,res ) => {
    try {

        let { verificationCode } = req.params;

        let user = await User.findOne({verificationCode});

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized access, invalid verification code"
            });
        }

        user.verified = true;
        user.verificationCode = undefined;

        await user.save();

        return res.sendFile(join(__dirname,'../templates/verification-success.html'));

    } catch (error) {

        return res.sendFile(join(__dirname,'../templates/error.html'));
    }
}

export const authenticate = async ( req,res ) => {
    try {
        let { email,password } = req.body;
        let user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "username not found"
            });
        }

        if ( !(await user.comparePassword(password)) ){
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        let token = await user.generateJWT();

        return res.status(200).json({
            success: true, 
            user: user.getUserInfo(),
            token: `Bearer ${token}`,
            message: "Congratulation, you are now Logged In"
        });


    } catch (error) {
         console.log(`error user authentication: ${error}`);
        return res.status(500).json({
            success: false,
            message: `An error Occurred ${error}`
        });       
    }
}