const {registerSchema} = require("./auth.validator") 
const {activateUserSchema} = require("./auth.validator") 
const {loginSchema} = require("./auth.validator") 
const {meSchema} = require("./auth.validator") 
const {forgotPasswordSchema} = require("./auth.validator") 
const {setPasswordSchema} = require("./auth.validator") 

const authSvc = require("./auth.service");
const AuthRequest = require('./auth.request')
const mailSvc = require("../../services/mail.service")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()


const {MongoClient} = require('mongodb')
const { generateRandomString } = require("../../helpers/helpers")
const { validate } = require("./user.model")
//coredriver
//form->mongoose

class AuthController{
    async registerUser(req, res, next){
        try{
            let mapped = (new AuthRequest(req)).transformRegisterData()
            const response = await authSvc.storeUser(mapped)

            // mailSvc.sendEmail(
            //     mapped.email,
            //     "Activate your account!!",
            //     `<b>Dear, ${mapped.name}</b>
            //     <p>Your account has been registered successfully. </p>
            //     <p>Please click the link below or copy the url to activate you r account: </P>
            //     <p> <a href = "${process.env.FRONTEND_URL}/activate/${mapped.token}>http://localhost:5173/activate/${mapped.token}</p>
            //     <p>Thank you</p>
            //     <p>Regards</P>`
            // )
            res.json({
                result: response, 
                // result: mapped,
                msg: "User Registered",
                meta: null
            })
        /*
        // let errorBag = {}
        // if (body.name ===null || body.name ===''){
        //     errorBag['name'] = "Name is required"
        // } else if (body.name.length > 30){
        //     errorBag['name'] = "Name should be of 30 characters only."
        // }
        // if (body.email ===null || body.email ===''){
        //     errorBag['email'] = "Email is required"
        // }
        // if (body.role ===null || body.role ===''){
        //     errorBag['role'] = "Role is required"
        // }
    
        // if((Object.keys(errorBag)).length > 0){
        //     res.status(400).json({
        //         msg: "Validation failure",
        //         result: errorBag,
        //         meta: null
        //     })
        // }
    
    
    
            // if (body.name !== null && body.email !== null && body.role !== null){
            //     res.status(400).json({
            //         result: body,
            //         message: "name or email, or role should not be empty",
            //         meta: null
            //     })
            // }
            // console.log(body)
            */
            // let validated = registerSchema.parse(body)
            // console.log(validated)
        }
        catch(exception){
            next(exception);
        }
    }
    
    async activateUser(req, res, next){
        try{
            let token = req.params.token;
            const userDetail = await authSvc.getUserByFilter({token:token})
            if (userDetail.length === 1){
                let password = bcrypt.hashSync(req.body.password, 10);

                const updateResponse = await authSvc.updateUser(userDetail[0]._id, {
                    password: password,
                    token: null,
                    status: "active",
                })
                res.json({
                    result: updateResponse,
                    message: "Your account has been updates successfully",
                    meta: null,
                })
            }else{
                next({code: 400, message:"Token expired or doesnot exist"})
            }
            
        } catch (exception){
            next(exception);
        }
    }
    
    async loginUser(req, res, next){
        try{
            let credentials = req.body;
            let userDetail = await authSvc.getUserByFilter({
                email: credentials.email
            })

            if(userDetail.length !==1){
                next({code: 400, message: "User doesnot exist or not active"})
            }

            userDetail = userDetail[0]
            if (userDetail.token){
                next({code: 400, message: "User not activated"})
            }
            if(bcrypt.compareSync(credentials.password, userDetail.password)){
                if(userDetail.status !== "active"){
                    next({code: 401, message: "Your account is suspended or not activated, Contact Admin."})
                } else{
                    let token = jwt.sign({
                        id: userDetail._id
                    }, process.env.JWT_SECRET, {
                        expiresIn: "1h"
                    })
    
                    let refreshToken = jwt.sign({
                        id: userDetail._id
                    }, process.env.JWT_SECRET, {
                        expiresIn: "7h"
                    })
                        res.json({
                            result:{
                                token: token,
                                refreshToken: refreshToken,
                                type: "Bearer",
                                detail:{
                                    _id: userDetail._id,
                                    name: userDetail.name,
                                    email: userDetail.email,
                                    role: userDetail.role
                                }
                            },
                            message: "Login Success",
                            meta: null
                        })
                    }
                } else{
                    next({
                        code: 400,
                        message: "Credentials doesnot match"
                    })
                }         
        }catch(exception){
            next(exception)
        }
    }

    getMe = (req, res, next)=>{
        res.json({
            result: req.authUser,
            message: "Your Profile",
            meta: null
        })
    }
    forgotPassword = async (req, res, next) =>{
        try{
            let email = req.body.email
            let userDetail = await authSvc.getUserByFilter({
                email:email
            })
            if(userDetail.length ===1){
                let user = userDetail[0]

                user.forgetToken = generateRandomString(100);
                let date = new Date();
                date.setUTCHours(date.getUTCHours()+2)
                user.validateTill = date;

                await user.save()

                let message = authSvc.getResetMessage(user.name, user.forgetToken)
                //email send
                mailSvc.sendEmail(
                    user.email,
                    "Reset Password",
                    message
                )
                res.json({
                    result:{
                        user: user
                    },
                    message: "Passowrd reset token send successfully",
                    meta: null
                })

            }else{
                throw{code: 400, message: "User doesnot exist"}
            }
        }catch(exception){
            next(exception)
        }
    }
    resetPassword = async (req, res, next) => {
        try{
            let token = req.params.token;
            const userDetail = await authSvc.getUserByFilter({
                forgetToken: token,
                validateTill: {$gte: (new Date())}
            })

            if (userDetail.length === 1){

                const password = bcrypt.hashSync(req.body.password, 10);

                const updateResponse = await authSvc.updateUser(userDetail[0]._id, {
                    password: password,
                    forgetToken: null,
                    validateTill: null
                })
                res.json({
                    result: updateResponse,
                    message: "Your password has been changed successfully",
                    meta: null,
                })

            }else{
                next({code: 400, message:"Token expired or doesnot exist"})
            }
            
        } catch (exception){
            next(exception);
        }
    }
}


const authCtrl = new AuthController()
module.exports = authCtrl;