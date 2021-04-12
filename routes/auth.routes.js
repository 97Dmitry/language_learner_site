const Router = require("express")
const router = new Router()
const authController = require("../controller/auth.controller")
const {check} = require("express-validator")


router.post("/registration",[
  check("username", "Username cannot be empty").notEmpty(),
  check("user_password", "Password cannot be less 4 symbol and more 12").isLength({min: 4, max: 12})
], authController.registration)
router.post("/authorization", authController.authorization)
router.get("/users", authController.users)

module.exports = router