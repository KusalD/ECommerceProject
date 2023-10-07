const router = require("express").Router();
const brandCtr = require("./brand.controller")

router.get("/brand", "/brand/list-home", "/brand/:id", "/brand/:slug/details", brandCtr.getBrand)
router.post("/postbrand", brandCtr.postBrand)
router.put("/updateBrand", brandCtr.updateBrand)
router.delete("/deletebrand", brandCtr.deleteBrand)

module.exports = router