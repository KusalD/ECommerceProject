const router = require("express").Router()
const bannerCtr = require("./banner.controller")

router.post("./createBanner", bannerCtr.createBanner);
router.get("./getBanner", bannerCtr.getBanner);
router.put("./updateBanner"), bannerCtr.updateBanner;
router.delete("./deletebanner", bannerCtr.deleteBanner);



module.exports = router;