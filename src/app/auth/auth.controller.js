const AuthRequest = require("./auth.request");
const sgMail = require('@sendgrid/mail')
const bcrypt = require("bcryptjs")
const mailSvc = require("../../services/mail.service")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
class AuthController{
    registerUser(req, res, next){
        try{
            let mapped = (new AuthRequest(req)).transformRegisterData()
            mailSvc.sendEmail(
                mapped.email,
                "Activate your account",
                `<b>Dear, ${mapped.name},</b><p>Your account has been registered successfully</p>
                <p>Please click the link below to activate your account: </p>
                <, href="${process.env.FRONTEND_URL}/activate/${mapped.token}">http://localhost:5173/activate/${mapped.token}</a>
                <p>Thank you again for the use</p>
                <p>Regards</p>
                <p>No reply system</p>
                <p><small><em>DO not reply to this email</em></small></p>`
            )
            res.json({
                result:mapped,
                msg: "User Register",
                meta: null
            })
            }catch(exception){
                next(exception);
        }
    }


    activateUser(req, res, next) {
        try {
            let token = req.params.token;
            let password = bcrypt.hashSync(req.body.password, 10);
            res.json({
                result: password
            })
        } catch(exception){
            next(exception);
        }
    }
    login(req, res, next){
        try{
            let credentials = req.body;
            console.log(credentials)
            //todo: DB user fetch based on user email
            let userDetails = {
                id: 123,
                name: "Kusal Dotel",
                address: "Kathmandu, nepal",
                role: "admin",
                password: "$2a$10$MxcX2NPm/4NsGkN6CFw3XOZxHoyoetMUXh4ejaemNYBl3N2ZrML62"
            }
            if (bcrypt.compareSync(credentials.password, userDetails.password)){

                let token = jwt.sign({
                    id: userDetails.id
                }, process.env.JWT_SECRET,{
                    expiresIn: "1h"
                })
                let refreshtoken = jwt.sign({
                    id: userDetails.id
                }, process.env.JWT_SECRET,{
                    expiresIn: "7h"
                })

                res.json({
                    result: {
                        token: token,
                        refreshtoken: refreshtoken,
                        type: "Bearer",
                        detail:{
                            id: userDetails.id,
                            name: userDetails.name,
                            email: userDetails.email,
                            role: userDetails.role
                        }
                    },
                    message: "Login Success",
                    meta: null
                })
            }else{
                next({
                    code: 400,
                    message: "Credentials DOesnot "
                })
            }
        }catch (exception){
            next(exception)
        }
    }
}

const authCtrl = new AuthController()

module.exports = authCtrl; 
