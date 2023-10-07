const express = require("express")
const router = express.Router()
const authRouter = require("../app/auth/auth.router")
const bannerRouter = require("../app/banner/banner.router")


router.use("/auth", authRouter);
router.use("/banner", bannerRouter)


module.exports = router;