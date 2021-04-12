const db = require("../db")

class UserController {
  async createUser(request, response) {
    const {username, user_password} = request.body
    const newUser = await db.query(
      `INSERT INTO auth_user (username, user_password)
       VALUES ($1, $2) RETURNING *`, [username, user_password]
    );
    response.json(newUser.rows[0])
  }

  async getUsers(request, response) {
    const users = await db.query(`SELECT *
                                  FROM auth_user`)
    response.json(users.rows)
  }

  async getUser(request, response) {
    const id = request.params.id
    const user = await db.query(`SELECT *
                                 FROM auth_user
                                 where id = $1`, [id])
    response.json(user.rows[0])
  }

  async updateUser(request, response) {
    const {id, username, user_password} = request.body
    const user = await db.query(`UPDATE auth_user
                                 set username      = $1,
                                     user_password = $2
                                 where id = $3 RETURNING *`, [username, user_password, id])
    response.json(user.rows[0])
  }

  async deleteUser(request, response) {
    const id = request.params.id
    const user = await db.query(`DELETE
                                 FROM auth_user
                                 where id = $1`, [id])
    response.json(user.rows[0])
  }
}

module.exports = new UserController()