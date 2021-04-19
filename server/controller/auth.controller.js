const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const TokenGenerator = require("../utils/tokenGenerator");

class AuthController {
  async registration(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { username, user_email, user_password } = request.body;
      const candidate = await db.query(
        `SELECT username
         FROM auth_user
         where username = $1`,
        [username]
      );
      if (candidate.rows.length) {
        return response
          .status(400)
          .json({ message: `User with that name exists already` });
      } else {
        const hashPassword = await bcrypt.hashSync(user_password, 7);
        const newUser = await db.query(
          `INSERT INTO auth_user (username, user_email, user_password)
           VALUES ($1, $2, $3)
           RETURNING *`,
          [username, user_email, hashPassword]
        );
        await db.query(
          `INSERT INTO user_permissions (user_id, permission_id)
           VALUES ($1, $2)
           RETURNING *`,
          [newUser.rows[0].user_id, 1]
        );
        return response
          .status(201)
          .json({ message: `You were registration`, user: newUser.rows });
      }
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Registration error" });
    }
  }

  async authorization(request, response) {
    try {
      const { username, user_password } = request.body;
      const user = await db.query(
        `SELECT *
         FROM auth_user
         where username = $1`,
        [username]
      );
      if (!user.rows.length) {
        return response
          .status(404)
          .json({ message: `User ${username} not found` });
      }
      const checkPassword = await bcrypt.compareSync(
        user_password,
        user.rows[0].user_password
      );
      if (!checkPassword) {
        return response.status(400).json({ message: "Password isn't correct" });
      }

      const userId = user.rows[0].user_id;
      const permissions = await db.query(
        `SELECT permissions.permission
         FROM permissions,
              user_permissions
         WHERE permissions.permission_id = user_permissions.permission_id
           AND user_permissions.user_id = $1`,
        [userId]
      );

      const userPermissions = [];
      await permissions.rows.forEach((item) => {
        userPermissions.push(item.permission);
      });

      const tokens = await TokenGenerator.updateTokens(userId, userPermissions);

      return response.status(202).json({
        tokens: tokens,
        user: {
          user_id: userId,
          username: user.rows[0].username,
          permissions: userPermissions,
        },
      });
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Authorization error" });
    }
  }

  async refreshUserToken(request, response) {
    const { refreshToken } = request.body;
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.SECRET_KEY);
      if (payload.type !== process.env.REFRESH_TOKEN_TYPE) {
        return response.status(400).json({ message: "Wrong token type" });
      }
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return response.status(400).json({ message: "Refresh token expired" });
      } else if (e instanceof jwt.JsonWebTokenError) {
        return response.status(400).json({ message: "Wrong token" });
      }
    }

    const userId = await db.query(
      `SELECT user_id
       FROM token
       WHERE token_id = $1`,
      [payload.id]
    );
    if (!userId) {
      return response.status(400).json({ message: "Wrong token" });
    }

    console.log(userId);

    const permissions = await db.query(
      `SELECT permissions.permission
       FROM permissions,
            user_permissions
       WHERE permissions.permission_id = user_permissions.permission_id
         AND user_permissions.user_id = $1`,
      [userId.rows[0].user_id]
    );

    const userPermissions = [];
    await permissions.rows.forEach((item) => {
      userPermissions.push(item.permission);
    });
    const tokens = await TokenGenerator.updateTokens(
      userId.rows[0].user_id,
      userPermissions
    );
    return response.status(200).json({ tokens: tokens });
  }
}

module.exports = new AuthController();
