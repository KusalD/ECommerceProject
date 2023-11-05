const mongoose = require("mongoose")
const TransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: "CartDetail",
        require: true
    },
    mode: {
        type: String,
        enum: ['esewa', 'khalti', 'bank', 'cod'],
        default: "cod"
    },
    payment: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ['paid', 'cancelled', 'pending'],
        default: 'pending'
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
})

const TransactionModel = mongoose.model("Transaction", TransactionSchema)
module.exports = TransactionModel