const express = require("express")
const app = express();

const routes = require('../routes');
const { ZodEffects, ZodError } = require("zod");

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


app.use('/api/v1', routes)

//404 handler
app.use((req, res, next)=>{
    next({code: 404, message: "Not found"}) //next with parameter calls error handeling)
})

app.use((error, req, res, next) => {
    //error
    let code = error.code ?? 500;
    let msg = error.message ?? "Internal server error"

    if(error instanceof ZodError){
        //validation exception
        let errorMsg = {};
        error.errors.map((errorObj) =>{
            errorMsg[errorObj.path[0]] = errorObj.message
        })
        code = 400;
        msg = errorMsg
    }

    res.status(code).json({
        result: null,
        msg: msg,
        meta: null
    })
})
module.exports = app;