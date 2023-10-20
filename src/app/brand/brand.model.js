const mongoose = require("mongoose")
const BrandSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        unique: true,
        min: 3
    },
    slug: {
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    image: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: false,
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const BrandModel = mongoose.model("Brand", BrandSchema)
module.exports = BrandModel