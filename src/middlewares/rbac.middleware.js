const checkPermission = (checkRole) => {
    return (req, res, next) => {
        try {
            let user = req.authUser;
            if(typeof checkRole === 'string' && user.role.toLowerCase() !== checkRole.toLowerCase()) {
                next({code: 403, message: "You do not have previlegae to access the system"})
            } else if(typeof checkRole === 'object' && !(checkRole.includes(user.role))) {
                next({code: 403, message: "You do not have previlegae to access the system"})
            } else {
                next()
            }
        } catch(exception) {
            next(exception);
        }
    }
}

module.exports = checkPermission