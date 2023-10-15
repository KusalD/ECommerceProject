const express = require("express")
const router = express.Router()
const authrouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")


router.use('/auth', authrouter);
router.use("/banner", bannerRouter)



module.exports = router;