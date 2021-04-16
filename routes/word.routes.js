const Router = require("express")
const router = new Router()
const WordController = require("../controller/word.controller")
const {check} = require("express-validator")

router.post("/word", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addWord)
router.get("/word", WordController.getWords)
router.get("/word/:slug", WordController.getWord)
router.put("/word/:slug", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.updateWord)
router.delete("/word/:slug", WordController.deleteWord)

module.exports = router