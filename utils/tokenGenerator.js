const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const db = require("../db");

class TokenGenerator {
  generateAccessToken(userId, userPermissions) {
    const payload = {
      user_id: userId,
      permissions: userPermissions,
      type: process.env.ACCESS_TOKEN_TYPE
    };
    const secretKey = process.env.SECRET_KEY;
    const options = {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN};

    return jwt.sign(payload, secretKey, options);
  }

  generateRefreshToken() {
    const payload = {
      id: uuidv4(),
      type: process.env.REFRESH_TOKEN_TYPE
    };
    const secretKey = process.env.SECRET_KEY;
    const options = {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN};

    return {
      id: payload.id,
      token: jwt.sign(payload, secretKey, options)
    };
  }

  async replaceDbRefreshToken(tokenId, userId) {
    const update = await db.query(`UPDATE token
                                   set token_id = $1,
                                       user_id  = $2
                                   where user_id = $2
                                   RETURNING *`, [tokenId, userId]);
    if (!update.rowCount) {
      await db.query(`INSERT INTO token (token_id, user_id)
                      VALUES ($1, $2)
                      RETURNING *`, [tokenId, userId])
    }
  }

  updateTokens(userId, userPermissions) {
    const accessToken = this.generateAccessToken(userId, userPermissions);
    const refreshToken = this.generateRefreshToken();

    return this.replaceDbRefreshToken(refreshToken.id, userId).then(() => ({
      accessToken,
      refreshToken: refreshToken.token
    }));
  }
}

module.exports = new TokenGenerator()