const bannerSvc = require("./banner.service")

class BannerController{
    bannerSvc;
    constructor(svc){
        this.bannerSvc = svc
    }

    storeBanner = async(req, res, next) => {
        try{
            let data= this.bannerSvc.transformBannerCreateData(req)
            let createdBanner = await this.bannerSvc.createBanner(data)
            res.json({
                result: createdBanner,
                message: "Banner Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
            console.log(exception);
        }
    }
    listAllBanners = async(req, res, next) => {
        try{
            let search = req.query.search ?? null
            let limit = 10;
            let currentPage = (req.query.page) ? Number(req.query.page) : 1;

            let skip = (currentPage-1) * limit;

            let filter ={}

            if (search) {
                filter = {
                    ...filter,
                    $or: [
                        {title: new RegExp(search, "i")},
                        {link: new RegExp(search, "i")},
                        {status: new RegExp(search, "i")}
                    ]
                }
            }
            let count = await this.bannerSvc.totalCount(filter)
            let data = await this.bannerSvc.listAllBanner(filter, {skip: skip, limit: limit})

            res.json({
                result: data,
                message: "Banner fetched successfully",
                meta: {
                    total: count,
                    limit: limit,
                    currentPage: currentPage
                }
            })

        }catch(exception){
            next(exception)
        }
    }
    
    detailBannerByID= async(req, res, next) => {
        try{
            let id = req.params.id
            let bannerDetail = await this.bannerSvc.getBannerByID(id)
            res.json({
                result: bannerDetail,
                message: "Banner Detail Fetched",
                meta: null

            })
        }catch(exception){
            next(exception)
        }
    }

    updateBanner = async(req, res, next) =>{
        try{
            let bannerDetail = await this.bannerSvc.getBannerByID(req.params.id)
            if(!bannerDetail){
                next({ status: 404, message: "Banner doesnot exists"})
            }
            let data= this.bannerSvc.transformBannerCreateData(req, true)

            if(!data.image){
                data.image = bannerDetail.image
            }
            let oldBanner = await this.bannerSvc.updateBannerById(data, bannerDetail._id)

            if(oldBanner.image !== data.image){
                deleteFile('./public/uploads/'+oldBanner.image)
            }
            res.json({
                result: oldBanner,
                message: "Banner Updated Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    deleteBannerById = async (req, res, next)=>{
        try{
            let oldData = await this.bannerSvc.deleteBannerById(req.params.id)
            if(oldData){
                deleteFile("./public/uploads"+oldData.image)
                res.json({
                    result: oldData,
                    message: "Banner deleted successfully",
                    meta: null
                })

            } else{
                next({code: 404, message: "Banner doesnot exist"})
            }
        }catch(exception){
            next(exception)
        }
    }
    getListForHome= async(req, res, next)=>{
        try{
            let limit = Number (req.params.limit) ?? 10
            let data = await this.bannerSvc.getBannerForHome(limit)
            res.json({
                result: data,
                message: "Banner fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

}

// const bannerCtrl = new BannerController();
module.exports = BannerController;