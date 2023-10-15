const UserModel = require("./user.model");
require('dotenv').config
class AuthService{
    
    async storeUser(data) {
        try {
            let user = new UserModel(data);
            return await user.save();       // existing user => update, new user => insert
        } catch(exception) {
            throw exception
        }
    }

    async getUserByFilter(filter = {}) {
        try {
            let userDetail = await UserModel.find(filter)
            
            return userDetail;
        } catch(exception) {
            throw exception;
        }
    }

    async updateUser(id, data) {
        try {
            let response = await UserModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response;
        } catch(exception) {
            throw exception
        }
    }
    getResetMessage = (name, token) =>{
        return `
        <b> Dear ${name}</b><br/>
        <p>Click link to reset password <p>
        <a href = "${process.env.FRONTEND_URL}/reset-password/${token}">"${process.env.FRONTEND_URL}/reset-password/${token}"</a>
        <br/>
        <p></p>
        <p>If this was mistake, please ignore the message</p>
        <p>Regards</p>
        `
    }
}

const authSvc = new AuthService();
module.exports = authSvc
