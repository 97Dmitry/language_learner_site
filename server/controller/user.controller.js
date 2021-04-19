const db = require("../db/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

class UserController {
  async createUser(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { username, user_password, user_email } = request.body;
      const newUser = await db.query(
        `INSERT INTO auth_user (username, user_password, user_email)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [username, user_password, user_email]
      );
      await db.query(
        `INSERT INTO user_permissions (user_id, permission_id)
         VALUES ($1, $2)
         RETURNING *`,
        [newUser.rows[0].user_id, 1]
      );
      response.status(201).json(newUser.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Create error" });
    }
  }

  async getUsers(request, response) {
    try {
      const users = await db.query(`SELECT *
                                    FROM auth_user`);
      response.status(200).json(users.rows);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Get error" });
    }
  }

  async getUser(request, response) {
    try {
      const user_id = request.params.user_id;
      const user = await db.query(
        `SELECT *
         FROM auth_user
         where user_id = $1`,
        [user_id]
      );
      response.status(200).json(user.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Get error" });
    }
  }

  async updateUser(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { user_id, username, user_password, user_email } = request.body;
      const hashPassword = await bcrypt.hashSync(user_password, 7);
      const user = await db.query(
        `UPDATE auth_user
         set username      = $1,
             user_password = $2,
             user_email    = $3
         where user_id = $4
         RETURNING *`,
        [username, hashPassword, user_email, user_id]
      );
      response.status(201).json(user.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Update error" });
    }
  }

  async deleteUser(request, response) {
    try {
      const user_id = request.params.user_id;
      const user = await db.query(
        `DELETE
         FROM auth_user
         where id = $1`,
        [user_id]
      );
      response.status(200).json(user.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }
}

module.exports = new UserController();
