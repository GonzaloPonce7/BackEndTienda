// roles es un ["ADMIN","CLIENT","PUBLIC"]
export const validateRoles = (roles) => (req, res, next) => {
    //if(roles.includes('PUBLIC')) return next()
    if(!roles.includes(req.session.user.role)) {
        res.send(401, 'Rol no valido')
    }
    next()
}