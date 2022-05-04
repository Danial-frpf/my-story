import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //Checking weather the token is ours or google's
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      //Now u know why we needed that secret
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      //For Google
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    //After checking all the above it will allow the user to do the task he/she wanted
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
