const mongoose = require("mongoose")
const BannerSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        min: 3
    },
    link: {
        type: String,
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
    position: {
        type: Number,
        default: 0
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

const BannerModel = mongoose.model("Banner", BannerSchema)
module.exports = BannerModel