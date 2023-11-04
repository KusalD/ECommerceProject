const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateRequest = require("../../middlewares/validator.middleware");

const router = require("express").Router()

const ProductController = require("./product.controller");
const productService = require("./product.service");
const productCtrl = new ProductController(productService);

const { ProductCreateSchema, ProductUpdateSchema } = require("./product.validator");


router.get("/home-list", productCtrl.getListForHome)
router.get("/trending", productCtrl.getTrendingProducts)
router.get("/:slug/slug", productCtrl.getProductbySlug)

router.route("/")
    .get(checkLogin, checkPermission('admin'), productCtrl.listAllProducts)
    .post(checkLogin, checkPermission('admin'), uploader.array('images'), validateRequest(ProductCreateSchema), productCtrl.storeProduct)
router.route("/:id")
    .get(checkLogin, checkPermission('admin'), productCtrl.detailProductByID)
    .put(checkLogin, checkPermission('admin'), uploader.array('images'), validateRequest(ProductUpdateSchema), productCtrl.updateProduct)
    .delete(checkLogin, checkPermission('admin'), productCtrl.deleteProductById)


router.get('/:id/count', productCtrl.increaseViewCount)


module.exports = router;
