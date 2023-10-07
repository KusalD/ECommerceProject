
class AuthController{
    registerUser(req, res, next){
        try{
            let body = req.body;
            console.log(body)
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