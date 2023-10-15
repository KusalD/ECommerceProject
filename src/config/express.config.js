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
            errorMsg[errorObj.path[0]] = errorObj.message
        })
        code = 400;
        msg = errorMsg;
    }

    if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
        code = 401;
        msg = error.message
    }
    res.status(code).json({
        result: null,
        msg: msg,
        meta: null
    })
});

module.exports = app;