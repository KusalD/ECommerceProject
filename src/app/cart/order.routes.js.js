const router = require("express").Router()
const checkLogin = require("../../middlewares/auth.middleware")
const validateRequest = require("../../middlewares/validator.middleware");
const orderCtrl = require("./order.controller");
const { orderCreateValidator, transactionBodySchema } = require("./order.validator");

router.post("/create", checkLogin, validateRequest(orderCreateValidator), orderCtrl.createOrder)
router.post('/:orderId/transaction', checkLogin, validateRequest(transactionBodySchema), orderCtrl.saveTransaction)
module.exports = router;