// const express  =require("express")
// const router = express.Router()
const validateRequest = require("../../middlewares/validator.middleware");
const router = require("express").Router();
const authCtrl = require("./auth.controller");
const uploader = require("../../middlewares/uploader.middleware");
const checkLogin = require("../../middlewares/auth.middleware")

const {registerSchema} = require("./auth.validator") 
const {activateUserSchema} = require("./auth.validator") 
const {loginSchema} = require("./auth.validator") 
const {meSchema} = require("./auth.validator") 
const {forgotPasswordSchema} = require("./auth.validator") 
const {setPasswordSchema} = require("./auth.validator"); 
const checkPermission = require("../../middlewares/rbac.middleware");

router.post("/register",uploader.single('image'), validateRequest(registerSchema),authCtrl.registerUser);
router.post("/activate/:token", validateRequest(activateUserSchema),authCtrl.activateUser);
router.post("/login",validateRequest(loginSchema), authCtrl.loginUser);
router.get("/me",checkLogin, authCtrl.getMe);
router.post("/forget-password",validateRequest(forgotPasswordSchema), authCtrl.forgotPassword);
router.post("/reset-password/:token",validateRequest(setPasswordSchema), authCtrl.resetPassword);


router.get("/admin", checkLogin,checkPermission(['admin']), (req, res, next) =>{
})

module.exports = router;