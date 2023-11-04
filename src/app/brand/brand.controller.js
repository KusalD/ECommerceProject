const { deleteFile } = require("../../helpers/helpers");
const brandSvc = require("./brand.service")

class BrandController{
    brandSvc;
    prodSvc;
    constructor(svc, prodSvc){
        this.brandSvc = svc
        this.prodSvc = prodSvc
    }

    storeBrand = async(req, res, next) => {
        try{
            let data= this.brandSvc.transformBrandCreateData(req)
            let createdBrand = await this.brandSvc.createBrand(data)
            res.json({
                result: createdBrand,
                message: "Brand Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
            console.log(exception)
        }

    }
    listAllBrands = async(req, res, next) => {
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
            let count = await this.brandSvc.totalCount(filter)
            let data = await this.brandSvc.listAllBrand(filter, {skip: skip, limit: limit})
            res.json({
                result: data,
                message: "Brand fetched successfully",
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
    
    detailBrandByID= async(req, res, next) => {
        try{
            let id = req.params.id
            let brandDetail = await this.brandSvc.getBrandByID(id)
            res.json({
                result: brandDetail,
                message: "Brand Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)

        }
    }
    getBrandBySlug= async(req, res, next) => {
        try{
            let slug = req.params.slug;
            let limit = 10;
            let currentPage = (req.query.page) ? Number(req.query.page) : 1;

            let skip = (currentPage-1) * limit;


            let count = await this.brandSvc.totalCount({})
            let data = await this.brandSvc.getBrandBySlug(slug)
            let products = await this.prodSvc.listAllProducts({
                brand: data._id
            }, skip, limit)
            res.json({
                result: {detail : data, products},
                message: "Brand fetched successfully",
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

    updateBrand = async(req, res, next) =>{
        try{
            let brandDetail = await this.brandSvc.getBrandByID(req.params.id)
            if(!brandDetail){
                next({ status: 404, message: "Brand doesnot exists"})
            }
            let data= this.brandSvc.transformBrandCreateData(req, true)

            if(!data.image){
                data.image = brandDetail.image
            }
            let oldBrand = await this.brandSvc.updateBrandById(data, brandDetail._id)

            if(oldBrand.image != data.image){
                deleteFile('./public/uploade/'+oldBrand.image)
            }
            res.json({
                result: oldBrand,
                message: "Brand Updated Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    deleteBrandById = async (req, res, next)=>{
        try{
            let oldData = await this.brandSvc.deleteBrandsById(req.params.id)
            if(oldData){
                deleteFile("./public/uploads"+oldData.image)
                res.json({
                    result: oldData,
                    message: "Brand deleted successfully",
                    meta: null
                })

            } else{
                next({code: 404, message: "Brand doesnot exist"})
            }
        }catch(exception){
            next(exception)
            console.log(exception)
        }
    }
    getListForHome= async(req, res, next)=>{
        try{
            let limit = Number (req.params.limit) ?? 10
            let data = await this.brandSvc.getBrandForHome(limit)
            res.json({
                result: data,
                message: "Brand fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

}

// const brandCtrl = new BrandController();
module.exports = BrandController;