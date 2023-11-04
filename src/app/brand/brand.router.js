const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateRequest = require("../../middlewares/validator.middleware");

const router = require("express").Router()

const BrandController = require("./brand.controller");
const brandService = require("./brand.service");
const productSvc = require("../product/product.service");

const brandCtrl = new BrandController(brandService, productSvc);

const { BrandCreateSchema, BrandUpdateSchema } = require("./brand.validator");


router.get("/home-list", brandCtrl.getListForHome)
router.get("/:slug/slug", brandCtrl.getBrandBySlug)

router.route("/")
    .get(checkLogin, checkPermission('admin'), brandCtrl.listAllBrands)
    .post(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(BrandCreateSchema), brandCtrl.storeBrand)
router.route("/:id")
    .get(checkLogin, checkPermission('admin'), brandCtrl.detailBrandByID)
    .put(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(BrandUpdateSchema), brandCtrl.updateBrand)
    .delete(checkLogin, checkPermission('admin'), brandCtrl.deleteBrandById)


module.exports = router;
