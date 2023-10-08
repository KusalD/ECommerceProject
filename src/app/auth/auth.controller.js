const AuthRequest = require("./auth.request");

class AuthController{
    registerUser(req, res, next){
        try{
            let mapped = (new AuthRequest(req)).transformRegisterData()
            console.log(mapped)
        }catch(exception){
            next(exception);
        }
    }
    activateUser(req, res, next) {
        let token = req.params.token;
        let query = req.query;
    }
}

const authCtrl = new AuthController()

module.exports = authCtrl; 