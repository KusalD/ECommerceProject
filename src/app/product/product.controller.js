const { deleteFile } = require("../../helpers/helpers");
const ProductModel = require("./product.model");
const productSvc = require("./product.service")

class ProductController{
    productSvc;
    constructor(svc){
        this.productSvc = svc
    }

    storeProduct = async(req, res, next) => {
        try{
            let data= this.productSvc.transformProductCreateData(req)
            let createdProduct = await this.productSvc.createProduct(data)
            res.json({
                result: createdProduct,
                message: "Product Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
            console.log(exception);
        }

    }
    listAllProducts = async(req, res, next) => {
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
                        {description: new RegExp(search, "i")},
                        {tags: new RegExp(search, 'i')},
                        {status: new RegExp(search, "i")}
                    ]
                }
            }
            let count = await this.productSvc.totalCount(filter)
            let data = await this.productSvc.listAllProducts(filter, {skip: skip, limit: limit})
            res.json({
                result: data,
                message: "Product fetched successfully",
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
    
    detailProductByID= async(req, res, next) => {
        try{
            let id = req.params.id
            let productDetail = await this.productSvc.getProductByID(id)
            res.json({
                result: productDetail,
                message: "Product Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }


    getProductbySlug = async(req, res, next) =>{
        try{
            let slug = req.params.slug
            let productDetail = await this.productSvc.getProductBySlug(slug)
            let catsId = productDetail.category.map((item) => item._id);

            let relatedProduct = await this.productSvc.listAllProducts({
                category: {$in: catsId},
                slug: {$ne : productDetail.slug},
            },{skip: 0, limit: 10})

            res.json({
                result: {productDetail, relatedProduct},
                message: "Product Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }



    updateProduct = async(req, res, next) =>{
        try{
            let productDetail = await this.productSvc.getProductByID(req.params.id)
            if(!productDetail){
                next({ status: 404, message: "Product doesnot exists"})
            }

            let data= this.productSvc.transformProductCreateData(req, true)
            data.images =[...productDetail.images, ...data.images]
            

            let delImages = req.body.delImage;
            let updatedImages = [];
            if(delImages){
                delImages = delImages.split(",");
                updatedImages = data.images.filter((image) => !delImages.includes(image))
                data.images = updatedImages;
                delImages.map((item) => {
                    deleteFile('./public/uploads'+item)
                })
            }

            let oldProduct = await this.productSvc.updateProductById(data, productDetail._id)

            res.json({
                result: oldProduct,
                message: "Product Updated Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    deleteProductById = async (req, res, next)=>{
        try{
            let oldData = await this.productSvc.deleteProductsById(req.params.id)
            if(oldData){
                oldData.images.map((item) => {
                    deleteFile('./public/uploads'+item)
                })
                res.json({
                    result: oldData,
                    message: "Product deleted successfully",
                    meta: null
                })

            } else{
                next({code: 404, message: "Product doesnot exist"})
            }
        }catch(exception){
            next(exception)
        }
    }





    getListForHome= async(req, res, next)=>{
        try{
            let search = req.query.search ?? null
            let limit = 10;
            let currentPage = (req.query.page) ? Number(req.query.page) : 1;

            let skip = (currentPage-1) * limit;
            let filter ={}

            if (search) {
                filter = {
                    ...filter,
                    $and :[
                        {status : "active"},
                        {$or: [
                            {title: new RegExp(search, "i")},
                            {description: new RegExp(search, "i")},
                            {tags: new RegExp(search, 'i')},
                            {status: new RegExp(search, "i")}
                        ]}
                    ]
                }
            }
            let count = await this.productSvc.totalCount(filter)
            let data = await this.productSvc.listAllProducts(filter, {skip: skip, limit: limit})
            res.json({
                result: data,
                message: "Product fetched successfully",
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

    getTrendingProducts = async(req, res, next) => {
            try{
                let search = req.query.search ?? null
                let limit = 10;
                let currentPage = (req.query.page) ? Number(req.query.page) : 1;
    
                let skip = (currentPage-1) * limit;
                let filter ={}
                
                let date = new Date();

                date.setMonth(date.getMonth() - 1);

                if (search) {
                    filter = {
                        ...filter,
                        $and :[
                            {status : "active"},
                            {createdAt: {$gte: date}},
                            {$or: [
                                {title: new RegExp(search, "i")},
                                {description: new RegExp(search, "i")},
                                {tags: new RegExp(search, 'i')},
                                {status: new RegExp(search, "i")}
                            ]}
                        ]
                    }
                }
                let count = await this.productSvc.totalCount(filter)
                let data = await this.productSvc.listAllProducts(filter, {skip: skip, limit: limit}, {viewCount: "DESC"})


                res.json({
                    result: data,
                    message: "Product fetched successfully",
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


    increaseViewCount = async(req, res, next) =>{
        try{
            let productId = req.params.id;
            let productDetail = await this.productSvc.getProductByID(productId)
            let count = 1;
            if(productDetail.viewCount){
                count = +productDetail.viewCount + 1
            }
            let update = await this.productSvc.updateProductById({
                viewCount: count
            }, productId)
            res.json({
                result: update,
                message: "Updated view Count",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

// const productCtrl = new ProductController();
module.exports = ProductController;