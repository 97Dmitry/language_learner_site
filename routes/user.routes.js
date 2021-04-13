const Router = require("express")
const router = new Router()
const userController = require("../controller/user.controller")
const {check} = require("express-validator")

router.post("/user", [
  check("username", "Username cannot be empty").notEmpty(),
  check("user_password", "Password cannot be less 4 symbol and more 15").isLength({min: 4, max: 15}),
  check("user_email", "Email cannot be less 5 symbol and more 35").isLength({min: 5, max: 35})
], userController.createUser)
router.get("/user", userController.getUsers)
router.get("/user/:id", userController.getUser)
router.put("/user", [
  check("username", "Username cannot be empty").notEmpty(),
  check("user_password", "Password cannot be less 4 symbol").isLength({min: 4, max: 15}),
  check("user_email", "Email cannot be less 5 symbol and more 35").isLength({min: 5, max: 35})
], userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

module.exports = router