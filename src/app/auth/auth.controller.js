const AuthRequest = require("./auth.request");
const sgMail = require('@sendgrid/mail')
const bcrypt = require("bcryptjs")
const mailSvc = require("../../services/mail.service")
const jwt = require("jsonwebtoken")
const authSvc = require("./auth.service");
const dotenv = require("dotenv")
dotenv.config()

const {MongoClient, ObjectId} = require('mongodb')

class AuthController{
    async registerUser(req, res, next){
        try{
            let mapped = (new AuthRequest(req)).transformRegisterData()
            //db insert
            const response = await authSvc.storeUser(mapped)

            // mailSvc.sendEmail(
            //     mapped.email,
            //     "Activate your account",
            //     `<b>Dear, ${mapped.name},</b><p>Your account has been registered successfully</p>
            //     <p>Please click the link below to activate your account: </p>
            //     <, href="${process.env.FRONTEND_URL}/activate/${mapped.token}">http://localhost:5173/activate/${mapped.token}</a>
            //     <p>Thank you again for the use</p>
            //     <p>Regards</p>
            //     <p>No reply system</p>
            //     <p><small><em>DO not reply to this email</em></small></p>`
            // )
            res.json({
                // result:response,
                result:mapped,
                msg: "User Register",
                meta: null
            })
            }catch(exception){
                next(exception);
        }
    }


    async activateUser(req, res, next) {
        try {
            let token = req.params.token;

            const connect = await MongoClient.connect(process.env.MONGODB_URL)
            const db = connect.db(process.env.MONGODB_NAME)

            let userDetails = await db.collection('users').findOne({
                token: token
            })

            if(userDetails) {
                let password = bcrypt.hashSync(req.body.password, 10);
                const updateResponse = await db.collection('users').updateOne({
                    _id: userDetails._id
                },{
                    $set:{
                        password: password,
                        token: null,
                        status: "active"
                    }
                })
                res.json({
                    result: updateResponse,
                    message: "Your account has been updated successfully",
                    meta: null
                })
            }else{
                next(code=400, message= "Token expired or doesnot exist")
            }

        } catch(exception){
            next(exception);
        }
    }
    async login(req, res, next){
        try{
            let credentials = req.body;

            const client = await MongoClient.connect(process.env.MONGODB_URL)
            const db = client.db(process.env.MONGODB_NAME)


            let userDetails = await db.collection('users').findOne({
                email: credentials.email
            })

            if(userDetails){
                if (userDetails.token){
                    next({code: 400, message: "User not activated"})
                }
                if (bcrypt.compareSync(credentials.password, userDetails.password)){

                    if(userDetails.status !== "active"){
                        next({code: 401, message: "Your account is suspended or not activated. Contact Admin"})
                    } else{
                        let token = jwt.sign({
                            id: userDetails._id
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
                                    id: userDetails._id,
                                    name: userDetails.name,
                                    email: userDetails.email,
                                    role: userDetails.role
                                }
                            },
                            message: "Login Success",
                            meta: null
                        })
                    }
                }else{
                    next({
                        code: 400,
                        message: "Credentials doesnot match"
                    })
                }
            }else{
                next({code: 400, message:"User doesnot exists"})
            }
        }catch (exception){
            next(exception)
        }
    }
    getLoggedInUser = (req, res, next) => {

    }
}

const authCtrl = new AuthController()

module.exports = authCtrl; 
