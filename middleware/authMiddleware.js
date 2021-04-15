const jwt = require("jsonwebtoken")

module.exports = function (request, response, next) {
  if (request.method === "OPTIONS") {
    next()
  }

  try {
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      return response.status(403).json({message: "You are not authorization"})
    }
    // const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    // request.user = decodedData
    next()
  } catch (e) {
    return response.status(403).json({message: "You are not authorization"})
  }
}