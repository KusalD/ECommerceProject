const router = require("express").Router()
const categoryCtrl = require("./category.controller");

router.get("/category", "category/list-home","categoyr/id", "category/:slug",categoryCtrl.getCategory)
router.post("category", categoryCtrl.postCategory)
router.put("/category/:id", categoryCtrl.putCategory)
router.delete("/category/:id", categoryCtrl.deleteCategory)


module.exports = router