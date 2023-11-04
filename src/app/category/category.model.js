const mongoose = require("mongoose")
const CategorySchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true,
        unique: true,
        min: 2
    },
    slug: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
        require: false,
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        require: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    brands: [{
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        require: false
    }],
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

const CategoryModel = mongoose.model("Category", CategorySchema)
module.exports = CategoryModel