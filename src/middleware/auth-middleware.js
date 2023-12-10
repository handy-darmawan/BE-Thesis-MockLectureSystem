const jwt = require("jsonwebtoken");


const authMiddleware = async (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    response.status(401).json({
      error: "Unauthorized",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.Token_Secret_Key);
      if(decoded) {
        request.user = decoded
        next()
      }
       else {
        response.status(401).json({
          error: "Unauthorized",
        });
      }
    } catch (error) {
      response.status(401).json({
        error: "Unauthorized",
      });
    }
  }
};

module.exports = {
  authMiddleware,
};
