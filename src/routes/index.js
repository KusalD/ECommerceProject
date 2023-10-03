const express = require("express")
const router = express.Router()





router.use((req, res, next)=>{
    console.log("I am a middleware")
    req.user = {
        result: "success",
        msg: "I am in use",
        meta: null
    }
    req.mes = "I am a middleware"
    next();   
})


router.get('/users', (req, res, next)=>{
    res.json({
        result:{
            listOfUsers: [{
                msg: "List of users",
                value: "req"
            }
            ]
        }
        
    })
})

const checkLogin = (req, res, next) =>{
    console.log("I am only for login")
    next();
}


router.post('/login',checkLogin, (req, res, next)=>{
    res.json({
        result:{
            userDetails:[{
                msg: "User login",
                use: req.user
            }]
        }
    })
})
router.post('/register', (req, res, next)=>{
    res.status(404).json({
        result:{
            userDetails:[{
                msg: "Register request"
                
            }]
        }
    })
})
router.get('/:user/:idValue', (req, res, next)=>{
    let params = req.params;
    let Id = params.idValue;
    res.json({
        result: {
            userDetailsOfId: [{
                msg: "Details of Id: " + Id,
            }]
        }
    })
})

module.exports = router;