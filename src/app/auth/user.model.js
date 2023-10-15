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
        default: 'customer',
    },
    address:{
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
        type: String,
        require: true
    },
    token: String,
    forgetToken: String,
    validateTill: Date
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;