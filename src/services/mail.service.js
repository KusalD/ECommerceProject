const dotenv = require("dotenv")
dotenv.config()
const nodemailer = require("nodemailer")

class MailService {
    transporter;
    constructor(){
        try{
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PWD,
                },
            })
        }
            catch(exception){
                console.log(exception);
                throw{code: 500, msg:"Error connecting SMTP....."}
            }
    }
    sendEmail = async (to, sub, msg) =>{
        try{
            let response = await this.transporter.sendMail({
                to :to,
                from: process.env.SMTP_ADDR,
                subject: sub,
                html: msg,
                text: msg
            })
            if (response){
                return true;
            }
        }catch(exception){
            console.log(exception);
            throw{code: 500, msg: "Error sending email"}
        }
    }
}

const mailSvc = new MailService()
module.exports = mailSvc;
/* For sending mail wit sendgrid
            let mapped = (new AuthRequest(req)).transformRegisterData()
            sgMail.setApiKey(process.env.SMTP_SGKEY)
            const msg = {
                to: mapped.email,
                from: "kusaldotel@gmail.com",
                subject: "Activate your account",
                html: `<b>Dear, ${mapped.name},</b><p>Your account has been registered successfully</p>
                    <p>Please click the link below to activate your account: </p>
                    <, href="${process.env.FRONTEND_URL}/activate/${mapped.token}">http://localhost:5173/activate/${mapped.token}</a>
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
            
*/
