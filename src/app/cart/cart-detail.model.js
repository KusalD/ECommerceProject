const mongoose = require("mongoose")
const cartDetailSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    qty: {
        type: Number,
        min: 1,
        require: true
    },
    price: {
        type: Number,
        min: 1,
        require: true
    },
    discount: {
        type: Number,
        min: 1,
        require: true
    },
    totalAmt: {
        type: Number,
        min: 1,
        require: true
    },
    status: {
        type: String,
        enum: ['new', 'verified', 'cancelled', 'delivered'],
        default: "new"
    }
    },{
        autoCreate: true,
        autoIndex: true,
        timestamps: true
    })

const CartDetailModel = mongoose.model("CartDetail", cartDetailSchema)
module.exports = CartDetailModel