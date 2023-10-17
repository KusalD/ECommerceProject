const BannerModel = require("./banner.model");

class BannerService {
    transformBannerCreateData(request){
        let banner = {
            ...request.body,
            createdBy: request.authUser._id
        }
        if(!request.file){
            throw{code: 400, message: "Validation Failure", result: {image: "image is require"}}
        }else{
            banner['image'] = request.file.filename;
        }
        return banner;
    }

    createBanner = async (data) => {
        try{
            let banner = new BannerModel(data)
            return await banner.save()
        }catch(exception){
            throw exception
        }
    }

    totalCount = async(filter ={}) => {
        return BannerModel.countDocuments(filter)
    }

    listAllBanner = async (filter = {}, paging = {skip: 0, limit: 10})=>{
        try{
            let banner = await BannerModel.find(filter)
                .populate("createdBy")
                .sort({_id: "DESC"})
                .skip(paging.skip)
                .limit(paging.limit)
        } catch(exception){
            throw exception;
        }
    }
}

module.exports = BannerService;