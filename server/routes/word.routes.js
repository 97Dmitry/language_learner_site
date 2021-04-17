const Router = require("express")
const router = new Router()
const WordController = require("../controller/word.controller")
const {check} = require("express-validator")

// ADD
router.post("/word_add-learning-word", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addLearningWord)
//
router.post("/word_add-translation-verb", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationVerb)
//
router.post("/word_add-translation-noun", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationNoun)
//
router.post("/word_add-translation-general", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationGeneral)

// OTHER
router.get("/word", WordController.getWords)
router.get("/word/:slug", WordController.getWord)
router.put("/word/:slug", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.updateWord)
router.delete("/word/:slug", WordController.deleteWord)

module.exports = router