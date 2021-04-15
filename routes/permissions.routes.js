const Router = require("express")
const router = new Router()
const permissionsController = require("../controller/permissions.controller")
const {check} = require("express-validator")
const permissionMiddleware = require("../middleware/permissionMiddleware")


router.post("/permission", [
  permissionMiddleware("Admin"),
  check("permission", "Permission have to be is 3 symbol long").isLength({min: 3, max: 15})
], permissionsController.createPermission)
router.delete("/permission", permissionMiddleware("Admin"), permissionsController.deletePermission)

module.exports = router