const Router = require("express")
const router = new Router()
const wordController = require("../controller/word.controller")
const {check} = require("express-validator")

router.post("/word", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], wordController.addWord)
router.get("/word", wordController.getWords)
router.get("/word/:slug", wordController.getWord)
router.put("/word/:slug", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], wordController.updateWord)
router.delete("/word/:slug", wordController.deleteWord)

module.exports = router