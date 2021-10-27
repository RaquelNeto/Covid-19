const User = require('../models/User');

const autorizar = (roles) => {
    roles = roles || []
    return (req, res, next) => {
        if (!req.user) {
            next({
                message: 'Not Authenticated',
                status: 401
            })
        } else {
            const hasAuthorization = roles.includes(req.user.role)

            if (hasAuthorization) {
                next()
            } else {
                next({
                    message: 'Not Authorized',
                    status: 401
                })
            }
        }
    }
}


module.exports = autorizar