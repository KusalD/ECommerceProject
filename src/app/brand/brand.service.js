const BrandModel = require("./brand.model");
const slugify = require("slugify")


class BrandService {
    transformBrandCreateData(request, isEdit=false){
        let brand = {
            ...request.body,
            createdBy: request.authUser._id
        }

        if(!request.file && isEdit === false){
            throw{code: 400, message:"Validation Failure", result: {image: "Image is require"}}
        } else if(request.file){
            brand['image'] = request.file.filename;
        }

        if(!isEdit){
            brand['slug'] = slugify(brand.title, {
                replacement: "-",
                lower: true,
                trim: true
            })
        }

        return brand;
    }
    
    createBrand = async (data) => {
        try{
            let brand = new BrandModel(data)
            return await brand.save()
        }catch(exception){
            throw exception
        }
    }

    totalCount = async(filter = {}) =>{
        return BrandModel.countDocuments(filter)
    }

    listAllBrand = async(filter = {}, paging = {skip: 0, limit: 10}) => {
        try{
            let brand = await BrandModel.find(filter)
                .populate("createdBy", ['_id', 'name'])
                .sort({_id: "DESC"})
                .skip(paging.skip)
                .limit(paging.limit)
            return brand;
        }catch(exception) {
            throw exception;
        }
    }

    getBrandByID = async(id) => {
        try{
            let brand = await BrandModel.findById(id);
            return brand
        }catch(exception){
            throw exception
        }
    }
    getBrandBySlug = async(slug) => {
        try{
            let brand = await BrandModel.findOne({
                slug: slug
            });
            return brand
        }catch(exception){
            throw exception
        }
    }

    updateBrandById = async(data, id) =>{
        try{
            let response = await BrandModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteBrandsById = async(id) =>{
        try{
            let response = await BrandModel.findByIdAndDelete(id)
            return response
        }catch(exception){
            throw(exception);
        }
    }
    getBrandForHome = async(limit) =>{
        try{
            let data = await BrandModel.find({
                status: "active"
            })
            .sort({"position": "ASC"})
            .limit(limit);
            return (data);
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = new BrandService()