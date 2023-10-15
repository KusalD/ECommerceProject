// const express = require("express")
// const router = require(Router)
const router = require("express").Router();
const validateRequest = require("../../middlewares/validator.middleware");
const authCtrl = require("./auth.controller");
const { registerSchema, activateSchema, loginSchema } = require("./auth.validator");
const uploader  = require("../../middlewares/uploader.middleware");
const checkLogin = require("../../middlewares/auth.middleware");




router.post("/register",uploader.single('image'), validateRequest(registerSchema), authCtrl.registerUser)
router.post("/activate/:token",validateRequest(activateSchema), authCtrl.activateUser)
router.post("/login", validateRequest(loginSchema), authCtrl.login)
router.get("/me", checkLogin, authCtrl.getLoggedInUser) 
router.post("/forget-password", (req, res, next) => {

})
router.post("/set-password/:token", (req, res, next) => {

})

module.exports = router;