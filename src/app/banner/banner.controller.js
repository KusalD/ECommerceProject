const { bannerSvc } = require(".");

class BannerController{
    async storeBanner(req, res, next){
        try{
            let data= bannerSvc.transformBannerCreateData(req)
            let createdBanner = await bannerSvc.createBanner(data)
            res.json({
                result: createdBanner,
                message: "Banner Created Successfully",
                meta: null
            })
        } catch(exception){
            next (exception)
        }
    }
    async listAllBanners(req, res, next){
        try{
            let search = req.query.search ?? null
            let limit = 10;
            let currentPage = Number(req.query.page) ?? 1;
            let skip = (currentPage-1) * limit;

            let filter = {}

            if(search){
                filter = {
                    ...filter,
                    $or: [
                        {name: new RegExp(search, "i")},
                        {link: new RegExp(search, "i")},
                        {staus: new RegExp(search, 'i')}
                    ]
                }
            }
            let count = await bannerSvc.totalCount(filter)
            let data = await bannerSvc.listAllBanner(filter, {skip: skip, limit: limit})

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
    async listBannerById(req, res, next){

    }
    async updateBanner(req, res, next){

    }
    async deleteBannerById(req, res, next){
        
    }
    async getlistForHome(req, res, next){

    }
}

module.exports = BannerController;