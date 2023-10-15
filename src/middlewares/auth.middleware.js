const dotenv = require("dotenv")
dotenv.config()
const jwt = require('jsonwebtoken');
const authSvc = require("../app/auth/auth.service");

const checkLogin = async (req, res, next) => {
    try {
        // token 
        let token = null;

        if(req.query['token']) {
            token = req.query['token']
        }
        
        if(req.headers['authorization']){
            token = req.headers['authorization']
        }

        if(!token){
            // not authorized 
            next({code: 401, message: "Token not set"})
        } else {
            // token        => " " => []
            // Bearer token    => ["Bearer"]
            token = (token.split(" ")).pop()
            
            if(!token) {
                next({code: 401, message: "Token is empty or not set"})
            } else {
                // validate 
                // 
                const data = jwt.verify(token, process.env.JWT_SECRET)
                // id 
                if(!data.hasOwnProperty('id')) {
                    next({code: 401, message: "Invalid token"})
                } else {
                    let userDetail =await authSvc.getUserByFilter({
                        _id: data.id
                    })
                    if(userDetail.length !== 1){
                        next({code: 401, message: "User Does not exists anymore"})
                    }
                    req.authUser = userDetail[0]
                    next()
                }
            }
        }
        
    } catch(exception) {
        // jwt exce
        console.log({exception})
        next(exception)
    }
}
module.exports = checkLogin