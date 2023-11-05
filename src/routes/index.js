const express = require("express")
const router = express.Router()
const authrouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")
const brandRouter = require("../app/brand/brand.router")
const categoryRouter = require("../app/category/category.router")
const productRouter = require("../app/product/product.router")
const userRouter = require('../app/user/user.router')
const orderRouter = require('../app/cart/order.routes.js')

router.use('/auth', authrouter)
router.use('/banner', bannerRouter)
router.use("/brand", brandRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/cart", orderRouter)


module.exports = router;