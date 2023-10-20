const express = require("express")
const router = express.Router()
const authrouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")
const brandRouter = require("../app/brand/brand.router")

router.use('/auth', authrouter);
router.use("/banner", bannerRouter)
router.use("/brand", brandRouter)



module.exports = router;