const {matchedData} = require("express-validator");
const {encrypt, compare} = require("../utils/handlePassword");
const {tokenSign} = require("../utils/handlejwt");
const {usersModel} = require("../models");
const {handleHttpError} = require("../utils/handleError");

const registerCtrl = async (req, res) => {
    try{
     req = matchedData(req);
     const password = await encrypt(req.password);
     const body = {...req, password};
     const dataUser = await usersModel.create(body);
     dataUser.set("password", undefined, {strict:false})
     
     const data = {
       token: await tokenSign(dataUser),
       user:dataUser
     }
     
     res.status(201);
     res.send({data})
    }catch(e){
      handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

const loginCtrl = async (req, res) =>{
  try{
       req = matchedData(req);
       const user = await usersModel.findOne({where:{email:req.email}})
       .select('password name role email');
       console.log(user);
       if(!user){
        handleHttpError(res, "USER_NO_EXISTS", 404);
        return;
       }

       const hashPassword = user.get('password');
       const check = await compare(req.password, hashPassword);
       if(!check){
        handleHttpError(res, "PASSWORD_INVALID", 401);
        return;
       }

       user.set('password', undefined, {strict:false});
       const data = {
        token: await tokenSign(user),
        user
       }
       res.send({data});

  }catch(e){
      handleHttpError(res, "ERROR_LOGIN_USER");
      console.log(e);
  }
}

module.exports = {registerCtrl, loginCtrl};