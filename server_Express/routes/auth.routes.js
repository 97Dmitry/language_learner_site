const Router = require("express");
const router = new Router();
const AuthController = require("../controller/auth.controller");
const { check } = require("express-validator");
// const authMiddleware = require("../middleware/authMiddleware")
// const permissionMiddleware = require("../middleware/permissionMiddleware")

router.post(
  "/registration",
  [
    check("username", "Username have to be is 3 symbol long").isLength({
      min: 3,
      max: 15,
    }),
    check(
      "user_password",
      "Password cannot be less 4 symbol and more 15"
    ).isLength({ min: 6, max: 15 }),
    check("user_email", "Email cannot be less 5 symbol and more 35").isLength({
      min: 5,
      max: 35,
    }),
  ],
  AuthController.registration
);
router.post("/login", AuthController.authorization);
router.post("/refresh-token", AuthController.refreshUserToken);

module.exports = router;
