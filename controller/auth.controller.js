const db = require("../db")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator")

class authController {
  async registration(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {username, user_email, user_password} = request.body
      const candidate = await db.query(`SELECT username
                                        FROM auth_user
                                        where username = $1`, [username]);
      if (candidate.rows.length) {
        return response.status(400).json({message: `User with that name exists already`})
      } else {
        const hashPassword = await bcrypt.hashSync(user_password, 7)
        const newUser = await db.query(
          `INSERT INTO auth_user (username, user_email, user_password)
           VALUES ($1, $2, $3)
           RETURNING *`, [username, user_email, hashPassword]
        );
        await db.query(`INSERT INTO user_permissions (user_id, permission_id)
                        VALUES ($1, $2)
                        RETURNING *`, [newUser.rows[0].user_id, 1]
        );
        return response.status(201).json({message: `You were registration`, user: newUser.rows})
      }
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Registration error"})
    }
  }

  async authorization(request, response) {
    try {
      const {username, user_password} = request.body
      const user = await db.query(`SELECT *
                                   FROM auth_user
                                   where username = $1`, [username]);
      if (!user.rows.length) {
        return response.status(404).json({message: `User ${username} not found`})
      }
      const checkPassword = await bcrypt.compareSync(user_password, user.rows[0].user_password)
      if (!checkPassword) {
        return response.status(400).json({message: "Password isn't correct"})
      }

      const userId = user.rows[0].user_id
      const permissions = await db.query(`SELECT permissions.permission
                                         FROM permissions,
                                              user_permissions
                                         WHERE permissions.permission_id = user_permissions.permission_id
                                           AND user_permissions.user_id = $1`, [userId])

      const userPermissions =[]
      await permissions.rows.forEach( item => {
        userPermissions.push(item.permission)
      })

      const token = jwt.sign(
        {user_id: userId, permissions: userPermissions}, process.env.SECRET_KEY, {expiresIn: "24h"}
      )
      return response.status(202).json({
        token,
        user: {
          user_id: userId,
          username: user.rows[0].username,
          permissions: userPermissions

        }
      })
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Authorization error"})
    }
  }

  async users(request, response) {
    try {
      response.json("AUTHORIZATION IS WORK")
    } catch (e) {
      console.log(e)
    }
  }

}

module.exports = new authController()