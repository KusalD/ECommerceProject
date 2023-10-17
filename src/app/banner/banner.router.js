const checkLogin = require("../../middlewares/auth.middleware");
const checkPermission = require("../../middlewares/rbac.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const validateRequest = require("../../middlewares/validator.middleware");

const router = require("express").Router()

const{bannerCtrl} = require("./");
const { BannerCreateSchema } = require("./banner.validator");

router.get("/home-list", bannerCtrl.getlistForHome)

router.route("/")
    .get(checkLogin, checkPermission('admin'), bannerCtrl.listAllBanners)
    .post(checkLogin, checkPermission('admin'), validateRequest(BannerCreateSchema), uploader.single('image'), bannerCtrl.storeBanner)
router.route("/:id")
    .get(checkLogin, checkPermission('admin'), bannerCtrl.listBannerById)
    .put(checkLogin, checkPermission('admin'), validateRequest(BannerUpdateSchema), uploader.single('image'), bannerCtrl.updateBanner)
    .delete(checkLogin, checkPermission('admin'), bannerCtrl.deleteBannerById)

module.exports = router;