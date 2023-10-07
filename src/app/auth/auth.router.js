// const express = require("express")
// const router = require(Router)
const router = require("express").Router();
const validateRequest = require("../../middlewares/validator.middleware");
const authCtrl = require("./auth.controller");
const { registerSchema } = require("./auth.validator");



router.post("/register", validateRequest(registerSchema), authCtrl.registerUser)
router.post("/activate/:token", authCtrl.activateUser)
router.post("/login", (req, res, next) => {

})
router.get("/me", (req, res, next) => {

})
router.post("/forget-password", (req, res, next) => {

})
router.post("/set-password/:token", (req, res, next) => {

})

module.exports = router;