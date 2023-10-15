const dotenv = require("dotenv")
dotenv.config()

const jwt = require('jsonwebtoken')
const checkLogin = (req, res, next) => {
    try{
        let token = null;

        if(req.query['token']){
            token = req.query['token']
        }

        if(req.headers['authorization']){
            token = req.headers.authorization
        }

        if(!token){
            //not authorized
            next({code: 401, message: "token not set"})
        } else{
            token = (token.split(" ")).pop()
            if(!token){
                next({code: 401, message: "Token is empty or not set"})
            } else{
                const data = jwt.verify(token, process.env.JWT_SECRET)
                if(!data.hasOwnProperty('id')){
                    next({code: 401, message: "Invalid token"})
                } else{
                    req.authUser = {}
                    next()
                }
            }
        }
    } catch(exception){
        console.log(exception)
        next(exception)
    }
}
module.exports = checkLogin