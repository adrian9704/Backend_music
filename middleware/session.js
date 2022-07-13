const {handleHttpError} = require("../utils/handleError");
const {verifyToken} = require("../utils/handlejwt");
const {usersModel} = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertieskey = getProperties(); 
const ENGINE_DB = process.env.ENGINE_DB;

const authMiddleware = async (req, res, next) => {
  try{
      
    if(!req.headers.authorization){
        handleHttpError(res, "NO_TOKEN", 401);
        return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);
    
    if(!dataToken){
       handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
       return;
    }

    const query = {
      [propertieskey.id]:dataToken[propertieskey.id]
    }
     /*var user ; 
     if(ENGINE_DB === 'nosql'){
     user = await usersModel.findOne(query);
     }else{
       user = await usersModel.findOne({where:{id:query.id}});
     }*/
     const user = await usersModel.findOne(query);
    req.user = user;
    next();
  }catch(e){
      handleHttpError(res, "NO_SESSION", 401);
  }
}

module.exports = authMiddleware;
