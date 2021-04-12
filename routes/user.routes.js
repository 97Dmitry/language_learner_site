const Router = require("express")
const router = new Router()
const userController = require("../controller/user.controller")
const {check} = require("express-validator")

router.post("/user", [
  check("username", "Username cannot be empty").notEmpty(),
  check("user_password", "Password cannot be less 4 symbol and more 12").isLength({min: 4, max: 12})
], userController.createUser)
router.get("/user", userController.getUsers)
router.get("/user/:id", userController.getUser)
router.put("/user", [
  check("username", "Username cannot be empty").notEmpty(),
  check("user_password", "Password cannot be less 4 symbol").isLength({min: 4, max: 12})
], userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

module.exports = router