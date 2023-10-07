const router = require("express").Router()
const productCtrl = require("../product/product.controller")



router.get("product","product/list-home", "/product/:id","/product/:slug/", productCtrl.getProductDetails)
router.post("/product", productCtrl.postProduct)
router.put("/product/:id", productCtrl.putProduct)
router.delete("/product/:id", productCtrl.deleteProduct)


module.exports = router