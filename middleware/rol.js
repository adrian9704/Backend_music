const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
    try{
    const {user} = req;
    const rolesByUser = user.role;

    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
    if(!checkValueRol){
        handleHttpError(res, "USER_SIN_PERMISO",403);
        return;
    }
    next();
    }catch(e){
        handleHttpError(res, "ERROR_PERMISOS", 403);
        console.log(roles);
    }
}

module.exports = checkRol;