const jwt = require("jsonwebtoken");

class TokenParse {
  tokenParse(authString) {
    try {
      const token = authString.split(" ")[1];
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new TokenParse();
