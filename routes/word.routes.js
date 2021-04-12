const Router = require("express")
const router = new Router()
const userController = require("../controller/word.controller")

router.post("/word", userController.addWord)
router.get("/word", userController.getWords)
router.get("/word/:slug", userController.getWord)
router.put("/word/:slug", userController.updateWord)
router.delete("/word/:slug", userController.deleteWord)

module.exports = router