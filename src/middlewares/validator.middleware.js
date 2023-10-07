const {z} = require("zod")

const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            let data = req.body;
            schema.parse(data);
            next();
        } catch(exception){
            next(exception)
        }
    }
}


module.exports = validateRequest