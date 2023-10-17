const router = require('./banner.router')
const BannerController = require('./banner.controller');
const BannerService = require('./banner.service');
const bannerCtrl = new BannerController();
const bannerSvc = new BannerService();

module.exports = {
    bannerRouter: router,
    bannerCtrl,
    bannerSvc
}