const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
  if (request.method === "OPTIONS") {
    next();
  }

  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      return response.status(403).json({ message: "You are not logged in" });
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload.type !== process.env.ACCESS_TOKEN_TYPE) {
      return response.status(401).json({ message: "Wrong token" });
    }
    // const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    // request.user = decodedData
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ message: "Token expired" });
    }
    return response.status(403).json({ message: "You are not logged in" });
  }
};
