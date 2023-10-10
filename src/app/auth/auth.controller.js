const AuthRequest = require("./auth.request");
const sgMail = require('@sendgrid/mail')
const bcrypt = require("bcryptjs")
const mailSvc = require("../../services/mail.service")


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
}

const authCtrl = new AuthController()

module.exports = authCtrl; 
