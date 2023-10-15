const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true,
        enum: ['admin', 'seller', 'customer'],
        default: "customer"
    },
    address: {
        type: String,
        require: true
    },
    phone: String,
    password: String,
    status: {
        type: String,
        enum: ['inactive', 'active', 'other'],
        default: 'inactive'
    },
    image: {
        tyype: String,
        require: true
    },
    token: String,
    forgettoken: String,
    validateTill: Date
    
}, {
    autoIndex: true,
    autoCreate: true,
    collection
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;
