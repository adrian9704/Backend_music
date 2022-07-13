const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("./handlePropertiesEngine");
const propertieskey = getProperties(); 

const tokenSign = async (user) => {
          const sign = await jsonwebtoken.sign(
            {
               [propertieskey.id]:user[propertieskey.id],
                role:user.role
            },
            JWT_SECRET,
            {
                 expiresIn:"2h",
            }
          )
          return sign;
}

const verifyToken = async (tokenJwt) =>{
     try{
         return jsonwebtoken.verify(tokenJwt,JWT_SECRET);
     }catch(e){
          return null;
     }
};

module.exports = {tokenSign, verifyToken};