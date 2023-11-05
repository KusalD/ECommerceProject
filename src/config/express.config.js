const express = require("express");
const app = express();

require("./mongodb.config");

const routes = require("../routes");
const { ZodError } = require("zod");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))



app.use('/api/v1', routes)
//404 handle
app.use((req, res, next) =>{
    next({code: 404, message: "Not found"})
})

app.use((error,req, res, next) =>{
    let code = error.code ?? 500;
    let msg = error.message ?? "Internal server error";
    
    if (error instanceof ZodError){

        //validation exception
        let errorMsg = {};
        error.errors.map((errorObj)=>{
            if(errorObj.path.length){
                errorMsg[errorObj.path[0]] = errorObj.message
            } else{
                errorMsg['cart'] = "Cart cannot be empty or null"
            }
        })
        code = 400;
        msg = errorMsg;
    }

    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
        code = 401;
        msg = error.message
    }


    let result = null
    if(error.code === 11000){
        code = 422;
        const keys = Object.keys(error.keyPattern);
        result = keys.map((key) => ({[key]: key+ " should be unique"}))
        msg = "Validation Failed"
    }

    res.status(code).json({
        result: result,
        msg: msg,
        meta: null
    })
});

module.exports = app;