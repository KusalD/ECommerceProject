const { default: slugify } = require("slugify");
const BrandModel = require("./brand.model");
const slugufy = require("slugify")
class BrandService {
    transformBrandCreateData(request, isEdit = false){
        let brand = {
            ...request.body,
            createdBy: request.authUser._id
        }
        if(!request.file && isEdit === false){
            throw{code: 400, message: "Validation Failure", result: {image: "image is require"}}
        }else if(request.file) { 
            brand['image'] = request.file.filename;
        }

        if(!isEdit){
            brand['slug'] = slugify(brand.title, {
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

    totalCount = async(filter ={}) => {
        return BrandModel.countDocuments(filter)
    }

    listAllBrand = async (filter = {}, paging = {skip: 0, limit: 10})=>{
        try{
            let brands = await BrandModel.find(filter)
                .populate("createdBy", ["_id, name"])
                .sort({_id: "DESC"})
                .skip(paging.skip)
                .limit(paging.limit)
            return brands;
        } catch(exception){
            throw exception;
        }
    }

    getBrandById = async(id) => {
        try {
            let brand = await BrandModel.findById(id)
                .populate("createdBy", ["_id, name"])
            return brand
        } catch(excepiton){
            throw(excepiton)
        }
    }

    updataBrandById = async(data, id) =>{
        try{ 
            let response = await BrandModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response;
        }catch(excepiton){
            throw excepiton
        }
    }

    deleteBrandByid = async(id) => {
        try{
            let response = await BrandModel.findByIdAndDelete(id);
            return response;
        }catch(excepiton){
            throw excepiton
        }
    }

    getBrandForHome = async(limit) => {
        try{
            let data = await BrandModel.find({
                status: "active"
            })
            .sort({"position" : "ASC"})
            .limit(limit)
            return data;
            retun
        } catch(excepiton){
            throw excepiton
        }
    }
}
module.exports = new BrandService()
