const { deleteFile } = require("../../helpers/helpers");
const categorySvc = require("./category.service")
const productSvc = require("../product/product.service")
class CategoryController{
    categorySvc;
    productSvc;
    constructor(svc, prodSvc){
        this.categorySvc = svc
        this.productSvc = prodSvc
    }

    storeCategory = async(req, res, next) => {
        try{
            let data= this.categorySvc.transformCategoryCreateData(req)
            let createdCategory = await this.categorySvc.createCategory(data)
            res.json({
                result: createdCategory,
                message: "Category Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }

    }
    listAllCategories = async(req, res, next) => {
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
            let count = await this.categorySvc.totalCount(filter)
            let data = await this.categorySvc.listAllCategory(filter, {skip: skip, limit: limit})
            res.json({
                result: data,
                message: "Category fetched successfully",
                meta: {
                    total: count,
                    limit: limit,
                    currentPage: currentPage
                }
            })

        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    
    detailCategoryByID= async(req, res, next) => {
        try{
            let id = req.params.id
            let categoryDetail = await this.categorySvc.getCategoryByID(id)
            res.json({
                result: categoryDetail,
                message: "Category Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }


    getCategorybySlug = async(req, res, next) =>{
        try{
            let slug = req.params.slug
            let categoryDetail = await this.categorySvc.getCategoryBySlug(slug)
            let products = await this.productSvc.listAllProducts({
                category: categoryDetail._id
            })
            res.json({
                result: {categoryDetail, products},
                message: "Category Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }



    updateCategory = async(req, res, next) =>{

        try{
            let categoryDetail = await this.categorySvc.getCategoryByID(req.params.id)
            if(!categoryDetail){
                next({ status: 404, message: "Category doesnot exists"})
            }
            let data= this.categorySvc.transformCategoryCreateData(req, true)

            if(!data.image){
                data.image = categoryDetail.image
            }
            let oldCategory = await this.categorySvc.updateCategoryById(data, categoryDetail._id)

            if(oldCategory.image != data.image){
                deleteFile('./public/uploade/'+oldCategory.image)
            }
            res.json({
                result: oldCategory,
                message: "Category Updated Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    deleteCategoryById = async (req, res, next)=>{
        try{
            let oldData = await this.categorySvc.deleteCategorysById(req.params.id)
            if(oldData){
                deleteFile("./public/uploads"+oldData.image)
                res.json({
                    result: oldData,
                    message: "Category deleted successfully",
                    meta: null
                })

            } else{
                next({code: 404, message: "Category doesnot exist"})
            }
        }catch(exception){
            next(exception)
        }
    }





    getListForHome= async(req, res, next)=>{
        try{
            let limit = Number (req.params.limit) ?? 10
            let data = await this.categorySvc.getCategoryForHome(limit)
            res.json({
                result: data,
                message: "Category fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

}

// const categoryCtrl = new CategoryController();
module.exports = CategoryController;