const jwt = require("jsonwebtoken")

module.exports = function (permission) {
  return function (request, response, next) {
    if (request.method === "OPTIONS") {
      return next()
    }

    try {
      const token = request.headers.authorization.split(' ')[1]
      if (!token) {
        return response.status(403).json({message: "You are not authorization"})
      }
      let right = false
      const {permissions} = jwt.verify(token, process.env.SECRET_KEY)
      permissions.forEach(item => {
        if (permission.includes(item)) {
          right = true
        }
      })
      if (!right) {
          return response.status(403).json({message: "You are have no right"})
        }
      next()
    } catch (e) {
      return response.status(403).json({message: "You are not authorization"})
    }
  }
}