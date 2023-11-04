const userSvc = require("./user.service");
const AuthRequest = require("../auth/auth.request");
class UserController{

    listUsers = async(req, res, next) => {
        try{

            let page = req.query['page'] || 1;
            let limit = req.query['limit'] || 10
            let skip = (page - 1) * limit;

            let filterOpts = [];
            if(req.query['role']){
                filterOpts.push({
                    role: req.query['role']
                }) 
            }

            if(req.query['search']){
                filterOpts.push({
                    $or: [
                        {name: new RegExp(req.query['search'], 'i')},
                        {email: new RegExp(req.query['search'], 'i')},
                    ]
                })
            }

            filterOpts.push({
                _id: {$ne: req.authUser._id}
            })
            let filter = {}

            if (filterOpts.length){
                filter = {
                    $and: filterOpts
                }
            }


            let count = await userSvc.getCount(filter);
            let listUsers = await userSvc.getListOfUsers(filter, skip, limit)
            res.json({
                result: listUsers,
                message: "User Lists",
                meta: {
                    limit: limit,
                    total: count,
                    currentPage: page
                }
            })
        }catch(exception){
            next(exception)
            console.log(exception);
        }
    }



    updateUser = async(req, res, next) => {
        try{

            let id = req.params.id;
            let user = await userSvc.getUserById(id);

            let mapped = (new AuthRequest(req)).transformUpdateData()
            const response = await userSvc.updateUser(mapped,id)
            res.json({
                result: response, 
                msg: "User updated",
                meta: null
            })
        }catch(exception){
            next(exception) 
        }
    }


    storeUser = async(req, res, next) => {
        try{
            
        }
        catch(exception){
            next(exception)
        }
    }

    getUserById = async(req, res, next) => {
        try{
            let id = req.params.id;

            let userDetail = await userSvc.getUserById(id);
            res.json({
                result: userDetail,
                msg:"User Detail",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    deleteById = async(req, res, next) => {
        try{
            let delStatus = await userSvc.deleteUserByID(req.params.id);
            res.json({
                result: delStatus,
                msg: "User deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

const userCtrl = new UserController()

module.exports = userCtrl;