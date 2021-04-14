const db = require("../db")
const {validationResult} = require("express-validator")

class permissionsController {
  async createPermission(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {permission} = request.body
      const newPermission = await db.query(
        `INSERT INTO permissions (permission)
         VALUES ($1)
         RETURNING *`, [permission]
      );
      response.status(201).json(newPermission.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Create error"})
    }
  }

  async deletePermission(request, response) {
    try {
      const permission_id = request.params.permission_id
      const permission = await db.query(`DELETE
                                         FROM permissions
                                         where permission_id = $1`, [permission_id]);
      response.status(200).json(user.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Delete error"})
    }
  }

}

module.exports = new permissionsController()