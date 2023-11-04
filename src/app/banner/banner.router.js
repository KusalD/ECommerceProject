const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateRequest = require("../../middlewares/validator.middleware");

const router = require("express").Router()

const BannerController = require("./banner.controller");
const bannerService = require("./banner.service");
const bannerCtrl = new BannerController(bannerService);

const { BannerCreateSchema, BannerUpdateSchema } = require("./banner.validator");


router.get("/home-list", bannerCtrl.getListForHome)

router.route("/")
    .get(checkLogin, checkPermission('admin'), bannerCtrl.listAllBanners)
    .post(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(BannerCreateSchema), bannerCtrl.storeBanner)
router.route("/:id")
    .get(checkLogin, checkPermission('admin'), bannerCtrl.detailBannerByID)
    .put(checkLogin, checkPermission('admin'), uploader.single('image'), validateRequest(BannerUpdateSchema), bannerCtrl.updateBanner)
    .delete(checkLogin, checkPermission('admin'), bannerCtrl.deleteBannerById)


module.exports = router;
