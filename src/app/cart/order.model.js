const mongoose = require("mongoose")
const OrderSchemaDef = new mongoose.Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    cartDetail: [{
        type: mongoose.Types.ObjectId,
        ref: "CartDetail",
        required: true
    }],
    subTotal: {
        type: Number,
        min: 1,
        require: true
    },
    discount: {
        type: Number,
        min: 0,
        default: 0
    },
    taxAmt: {
        type: Number,
        min: 0,
        default: 0
    },
    totalAmt: {
        type: Number,
        min: 1,
        require: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    status: {
        type:String ,
        enum: ['new', 'verify', 'cancelled', 'delivered'],
        default :'new'
    }
}, {
    autoCreate: true,
    autoIndext: true,
    timestame: true
})

const OrderModel = mongoose.model("Order", OrderSchemaDef)

module.exports = OrderModel