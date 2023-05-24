import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

const auth = async (req, res, next)=>{
      try{
            const token = req.headers.authorization.split(" ")[1];
            // const isCustomAuth = token.length <500;
            let decodedData;
            if(token){
                  decodedData = jwt.verify(token, secret);
                  
                  req.userId = decodedData?.id;
            }
            console.log(req.userId)
            next();
      }catch(error){
            console.log(error);
      }
}

export default auth;