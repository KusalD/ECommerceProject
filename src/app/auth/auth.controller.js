const AuthRequest = require("./auth.request");
const nodemailer = require("nodemailer")
const sgMail = require('@sendgrid/mail')

class AuthController{
    registerUser(req, res, next){
            let mapped = (new AuthRequest(req)).transformRegisterData()
            sgMail.setApiKey("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")
            const msg = {
                to: mapped.email,
                from: "kusaldotel@gmail.com",
                subject: "Activate your account",
                html: `<b>Dear, ${mapped.name},</b><p>Your account has been registered successfully</p>
                    <p>Please click the link below to activate your account: </p>
                    <, href="http://localhost:5173/activate/${mapped.token}">http://localhost:5173/activate/${mapped.token}</a>
                    <p>Thank you again for the use</p>
                    <p>Regards</p>
                    <p>No reply system</p>
                    <p><small><em>DO not reply to this email</em></small></p>`,
                }
                console.log(mapped)
                sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    next(error)
                })
        
    }
    /*
        try{
            let mapped = (new AuthRequest(req)).transformRegisterData()

            let transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "b2eaf3fcaafb6c",
                    pass: "6e7fd3c9e74547",
                },
            })
            let mailResponse = await transporter.sendMail({
                to: mapped.email,
                from: "kusaldotel@gmail.com",
                subject: "Activate your account",
                html: `<b>Dear, ${mapped.name},</b><p>Your account has been registered successfully</p>
                <p>Please click the link below to activate your account: </p>
                <, href="http://localhost:5173/activate/${mapped.token}">http://localhost:5173/activate/${mapped.token}</a>
                <p>Thank you again for the use</p>
                <p>Regards</p>
                <p>No reply system</p>
                <p><small><em>DO not reply to this email</em></small></p>`,
            })
            console.log(mailResponse)
            console.log(mapped)
        }catch(exception){
            next(exception);
        }
    }
    */
    activateUser(req, res, next) {
        let token = req.params.token;
        let query = req.query;
    }
}

const authCtrl = new AuthController()

module.exports = authCtrl; 
