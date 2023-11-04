const BannerModel = require("./banner.model");

class BannerService {
    transformBannerCreateData(request, isEdit=false){
        let banner = {
            ...request.body,
            createdBy: request.authUser._id
        }

        if(!request.file && isEdit === false){
            throw{code: 400, message:"Validation Failure", result: {image: "Image is require"}}
        } else if(request.file){
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

    totalCount = async(filter = {}) =>{
        return BannerModel.countDocuments(filter)
    }

    listAllBanner = async(filter = {}, paging = {skip: 0, limit: 10}) => {
        try{
            let banner = await BannerModel.find(filter)
                .populate("createdBy", ['_id', 'name'])
                .sort({_id: "DESC"})
                .skip(paging.skip)
                .limit(paging.limit)
            return banner;
        }catch(exception) {
            throw exception;
        }
    }

    getBannerByID = async(id) => {
        try{
            let banner = await BannerModel.findById(id);
        }catch(exception){
            throw exception
        }
    }

    updateBannerById = async(data, id) =>{
        try{
            let response = await BannerModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteBannerById = async(id) =>{
        try{
            let response = await BannerModel.findByIdAndDelete(req.params.id)
        }catch(exception){
            throw(exception);
        }
    }
    getBannerForHome = async(limit) =>{
        try{
            let data = await BannerModel.find({
                status: "active"
            })
            .sort({"position": "ASC"})
            .limit(limit)
            return (data);
        }catch(exception){
            throw(exception)
        }
    }
}

module.exports = new BannerService()