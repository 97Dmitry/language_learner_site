const db = require("../../db/db");
const tp = require("../../utils/tokenParse");
const { validationResult } = require("express-validator");

class AddDataWordsController {
  async addLearningWord(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const user_id = tp.tokenParse(request.headers.authorization).user_id;
      const { learning_word } = request.body;
      const newWord = await db.query(
        `INSERT INTO word (learning_word, user_id)
         VALUES ($1, $2)
         RETURNING *`,
        [learning_word, user_id]
      );
      response.status(201).json(newWord.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Create error" });
    }
  }

  async addTranslationVerb(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { word_id, translation_verb } = request.body;
      const newWord = await db.query(
        `INSERT INTO translation_verb (word_id, translation_verb)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, translation_verb]
      );
      response.status(201).json(newWord.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Create error" });
    }
  }

  async addTranslationNoun(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { word_id, translation_noun } = request.body;
      const newWord = await db.query(
        `INSERT INTO translation_noun (word_id, translation_noun)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, translation_noun]
      );
      response.status(201).json(newWord.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Create error" });
    }
  }

  async addTranslationGeneral(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const { word_id, translation_general } = request.body;
      const newWord = await db.query(
        `INSERT INTO translation_general (word_id, translation_general)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, translation_general]
      );
      response.status(201).json(newWord.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Create error" });
    }
  }
}

module.exports = new AddDataWordsController();
