const router = require("express").Router()
const checkLogin = require("../../middlewares/auth.middleware")
const checkPermission = require("../../middlewares/rbac.middleware")
const userCtrl = require('./user.controller')
const validateRequest = require("../../middlewares/validator.middleware");
const {registerAdminTooSchema, updateUserSchema} = require("../auth/auth.validator") 
const authCtrl = require("../auth/auth.controller");
const uploader = require("../../middlewares/uploader.middleware");



router.route('/')
    .get(checkLogin, checkPermission('admin'), userCtrl.listUsers)
    .post(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(registerAdminTooSchema), authCtrl.registerUser);

router.route('/:id')
    .put(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(updateUserSchema), userCtrl.updateUser)
    .get(checkLogin, checkPermission('admin'), userCtrl.getUserById)
    .delete(checkLogin, checkPermission('admin'), userCtrl.deleteById);


module.exports = router