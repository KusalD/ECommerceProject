const mongoose = require("mongoose")
const { number } = require("zod")
const ProductSchema = new mongoose.Schema({
    
    name: {
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
        type: String
    },
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        require: false
    }],
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    price: {
        type: Number,
        require: true,
        min: 1,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    afterDiscount: {
        type: Number,
        require: true,
        min: 1,
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    tags: [{
            type: String
    }],
    stock: {
        type: Number,
        min: 0,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    image: [{
        type: String,
        require: true
    }],
    viewCount: {
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

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel