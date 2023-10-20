const bannerSvc = require ("./banner.service")

class BannerController{
    bannerSvc;
    constructor(svc){
        this.bannerSvc = svc
    }
    storeBanner = async(req, res, next)=>{
        try{
            let data= this.bannerSvc.transformBannerCreateData(req)
            let createdBanner = await this.bannerSvc.createBanner(data)
            res.json({
                result: createdBanner,
                message: "Banner Created Successfully",
                meta: null
            })
        } catch(exception){
            next (exception)
        }
    }
    listAllBanners  = async(req, res, next)=>{
        try{
            let search = req.query.search ?? null
            let limit = 10;
            let currentPage = (req.query.page) ? Number(req.query.page) : 1;

            let skip = (currentPage-1) * limit;

            let filter = {}

            if(search){
                filter = {
                    ...filter,
                    $or: [
                        {title: new RegExp(search, "i")},
                        {link: new RegExp(search, "i")},
                        {staus: new RegExp(search, 'i')}
                    ]
                }
            }
            let count = await this.bannerSvc.totalCount(filter)
            let data = await this.bannerSvc.listAllBanner(filter, {skip: skip, limit: limit})

            res.json({
                result: data,
                message: "Banner fetched Successfully",
                meta: {
                    total: count,
                    limit: limit,
                    currrentPage: currentPage
                }
            })
        } catch(exception){
            next(exception)
        }
    }

    detailBannerById = async(req, res, next) => {
        try{
            let id = req.params.id
            let bannerDetail = await this.bannerSvc.getBannerById(id)
            res.json({
                result: bannerDetail,
                message: "Banner detail fetchned",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

    updateBanner = async(req, res, next) => {
        try{
            let bannerDetail = await this.bannerSvc.getBannerById(req.params.id)
            if(!bannerDetail){
                next({status: 404, message: "Banner does not exists"})
            }
            let data= this.bannerSvc.transformBannerCreateData(req, true)

            if(!data.image) {
                data.image = bannerDetail.image
            }

            let oldBanner = await this.bannerSvc.updataBannerById(data, bannerDetail._id)
            
            res.json({
                result: oldBanner,
                message: "Banner Updated Successfully",
                meta: null
            })
        } catch(exception){
            next (exception)
        }
    }
    deleteBannerById = async(req, res, next) =>{
        
    }
    getlistForHome = async(req, res, next) =>{

    }
}
// const bannerCtrl = new BannerController
module.exports = BannerController;