const Router = require("express");
const router = new Router();
const AddDataWordsController = require("../controller/words/addDataWords.controller");
const ChangeDataWordsController = require("../controller/words/changeDataWords.controller");
const GetWordsController = require("../controller/words/getWords.controller");
const DeleteWordsController = require("../controller/words/deleteWords.controller");
const WordController = require("../controller/word.controller");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");

// ADD
router.post(
  "/word_add-learning-word",
  [check("learning_word", "Learning word cannot be empty").notEmpty()],
  authMiddleware,
  AddDataWordsController.addLearningWord
);
//
router.post(
  "/word_add-translation-verb",
  [check("translation_verb", "Learning word cannot be empty").notEmpty()],
  authMiddleware,
  AddDataWordsController.addTranslationVerb
);
//
router.post(
  "/word_add-translation-noun",
  [check("translation_noun", "Learning word cannot be empty").notEmpty()],
  authMiddleware,
  AddDataWordsController.addTranslationNoun
);
//
router.post(
  "/word_add-translation-general",
  [check("translation_general", "Learning word cannot be empty").notEmpty()],
  authMiddleware,
  AddDataWordsController.addTranslationGeneral
);

// CHANGE OR UPDATE

router.post(
  "/word_update-knowledge-value",
  [
    check("newValueKnowledge", "Learning word cannot be empty").notEmpty(),
    check("word_id", "Learning word cannot be empty").notEmpty(),
    authMiddleware,
  ],
  ChangeDataWordsController.changeKnowledgeValue
);

// GET WORDS

router.get("/words", authMiddleware, GetWordsController.getWords);
router.post("/word", authMiddleware, GetWordsController.getWord);
router.get("/random_word", authMiddleware, GetWordsController.getRandomWord);

// OTHER

router.put(
  "/word/:slug",
  [check("learning_word", "Learning word cannot be empty").notEmpty()],
  WordController.updateWord
);

// DELETE

router.delete("/word_delete-word", DeleteWordsController.deleteWord);
router.delete("/word_delete-verb", DeleteWordsController.deleteTranslationVerb);
router.delete("/word_delete-noun", DeleteWordsController.deleteTranslationNoun);
router.delete(
  "/word_delete-general",
  DeleteWordsController.deleteTranslationGeneral
);

module.exports = router;
