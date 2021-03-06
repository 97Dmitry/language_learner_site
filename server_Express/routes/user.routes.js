const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

router.post(
  "/user",
  [
    permissionMiddleware("Admin"),
    check("username", "Username have to be is 3 symbol long").isLength({
      min: 3,
      max: 15,
    }),
    check(
      "user_password",
      "Password cannot be less 4 symbol and more 15"
    ).isLength({ min: 4, max: 15 }),
    check("user_email", "Email cannot be less 5 symbol and more 35").isLength({
      min: 5,
      max: 35,
    }),
  ],
  UserController.createUser
);
router.get("/user", permissionMiddleware("Admin"), UserController.getUsers);
router.get("/user/:user_id", authMiddleware, UserController.getUser);
router.put(
  "/user",
  [
    authMiddleware,
    check("username", "Username have to be is 3 symbol long").isLength({
      min: 3,
      max: 15,
    }),
    check("user_password", "Password cannot be less 4 symbol").isLength({
      min: 4,
      max: 15,
    }),
    check("user_email", "Email cannot be less 5 symbol and more 35").isLength({
      min: 5,
      max: 35,
    }),
  ],
  UserController.updateUser
);
router.delete(
  "/user/:user_id",
  permissionMiddleware("Admin"),
  UserController.deleteUser
);

module.exports = router;
