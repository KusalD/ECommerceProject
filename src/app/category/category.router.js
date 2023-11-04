const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateRequest = require("../../middlewares/validator.middleware");

const router = require("express").Router()

const CategoryController = require("./category.controller");
const categoryService = require("./category.service");
const productService = require("../product/product.service");

const categoryCtrl = new CategoryController(categoryService, productService);

const { CategoryCreateSchema, CategoryUpdateSchema } = require("./category.validator");


router.get("/home-list", categoryCtrl.getListForHome)
router.get("/:slug/slug", categoryCtrl.getCategorybySlug)

router.route("/")
    .get(checkLogin, checkPermission('admin'), categoryCtrl.listAllCategories)
    .post(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(CategoryCreateSchema), categoryCtrl.storeCategory)
router.route("/:id")
    .get(checkLogin, checkPermission('admin'), categoryCtrl.detailCategoryByID)
    .put(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(CategoryUpdateSchema), categoryCtrl.updateCategory)
    .delete(checkLogin, checkPermission('admin'), categoryCtrl.deleteCategoryById)


module.exports = router;
