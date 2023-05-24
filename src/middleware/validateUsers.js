// roles ["admin","user","premium"]
export const validateRoles = (roles) => (req, res, next) => {
    if(!roles.includes(req.session.user.role)) {
        console.log(req.session.user.role);
        res.send(401, 'Rol no valido')
    }
    next()
}