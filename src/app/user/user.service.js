const UserModel = require("../auth/user.model")

class UserService {

    getCount= async(filter) => {
        try{
            let count = await UserModel.count(filter);
            return count;
        }catch(exception){
            throw exception
        }
        
    }

    getListOfUsers = async(filter, skip = 0, limit =10) => {
        try{
            let data = await UserModel.find(filter, {password: 0, token: 0})
                .skip(skip)
                .limit(limit);
            return data;
        } catch (exception){
            throw exception
        }
    }

    getUserById = async(id) => {
        try{
            let userDetail = await UserModel.findById(id)
            if(userDetail) {
                return userDetail
            } else{
                throw{
                    code: 404,
                    msg: "User does not exists"
                }
            }
        }catch(exception){
            throw exception
        }
    }

    updateUser = async (updateBody, id) => {
        try{
            let update = await UserModel.findByIdAndUpdate(id, {
                $set: updateBody
            })
            return update;
        }catch(exception){
            throw exception
        }
    }

    deleteUserByID = async(id) => {
        try{
            let response = await UserModel.findByIdAndDelete(id);
            if(response){
                return response
            }else{
                throw{code: 400, message: "User doesnot exist or already deleted"}
            }
        }catch(exception){
            throw exception
        }
    }
}

// const userSvc = 
module.exports = new UserService()