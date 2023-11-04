const CategoryModel = require("./category.model");
const slugify = require("slugify")


class CategoryService {
    transformCategoryCreateData(request, isEdit=false){
        let category = {
            ...request.body,
            createdBy: request.authUser._id
        }

        if(category.brands){
            category.brands = category.brands.split(",")
        } else if(!category.brands || category.brands ==="null"){
            category.brands = null
        }

        if(!category.parent || category.parent ==="null"){
            category.parent = null
        }
        

        if(!request.file && isEdit === false){
            throw{code: 400, message:"Validation Failure", result: {image: "Image is require"}}
        } else if(request.file){
            category['image'] = request.file.filename;
        }

        if(!isEdit){
            category['slug'] = slugify(category.title, {
                replacement: "-",
                lower: true,
                trim: true
            })
        }

        return category;
    }
    
    createCategory = async (data) => {
        try{
            let category = new CategoryModel(data)
            return await category.save()
        }catch(exception){
            throw exception
        }
    }

    totalCount = async(filter = {}) =>{
        return CategoryModel.countDocuments(filter)
    }

    listAllCategory = async(filter = {}, paging = {skip: 0, limit: 10}) => {
        try{
            let category = await CategoryModel.find(filter)
                .populate('parent', ['_id', 'title', 'parent', 'image', 'slug'])
                .populate('brands', ['_id', 'title', 'image', 'slug'])
                .populate("createdBy", ['_id', 'name'])
                .sort({_id: "DESC"})
                .skip(paging.skip)
                .limit(paging.limit)
            return category;
        }catch(exception) {
            throw exception;
        }
    }

    getCategoryByID = async(id) => {
        try{
            let category = await CategoryModel.findById(id)
                .populate('parent', ['_id', 'title', 'parent', 'image', 'slug'])
                .populate('brands', ['_id', 'title', 'image', 'slug'])
                .populate("createdBy", ['_id', 'name'])
            return category;
        }catch(exception){
            throw exception
        }
    }
    getCategoryBySlug = async(slug) => {
        try{
            let category = await CategoryModel.findOne({
                slug: slug
            })
                .populate('parent', ['_id', 'title', 'parent', 'image', 'slug'])
                .populate('brands', ['_id', 'title', 'image', 'slug'])
                .populate("createdBy", ['_id', 'name'])
            return category;
        }catch(exception){
            throw exception
        }
    }

    updateCategoryById = async(data, id) =>{

        try{
            let response = await CategoryModel.findByIdAndUpdate(id, {
                $set: data
            })
            return response;
        } catch (exception) {
            throw exception;
        }
    }

    deleteCategorysById = async(id) =>{
        try{
            let response = await CategoryModel.findByIdAndDelete(id)
            return response
        }catch(exception){
            throw(exception);
        }
    }
    getCategoryForHome = async(limit) =>{
        try{
            let data = await CategoryModel.find({
                status: "active"
            })
            .populate('parent', ['_id', 'title', 'parent', 'image', 'slug'])
            .populate('brands', ['_id', 'title', 'image', 'slug'])
            .sort({"position": "ASC"})
            .limit(limit);
            return (data);
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = new CategoryService()