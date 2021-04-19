const Router = require("express")
const router = new Router()
const WordController = require("../controller/word.controller")
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")

// ADD
router.post("/word_add-learning-word", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.addLearningWord)
//
router.post("/word_add-translation-verb", [
  check("translation_verb", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationVerb)
//
router.post("/word_add-translation-noun", [
  check("translation_noun", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationNoun)
//
router.post("/word_add-translation-general", [
  check("general_translation", "Learning word cannot be empty").notEmpty()
], WordController.addTranslationGeneral)

// OTHER
router.get("/words", authMiddleware, WordController.getWords)
router.get("/word/:word", WordController.getWord)
router.get("/random-word", authMiddleware, WordController.getRandomWord)
router.put("/word/:slug", [
  check("learning_word", "Learning word cannot be empty").notEmpty()
], WordController.updateWord)
router.delete("/word/:slug", WordController.deleteWord)

module.exports = router