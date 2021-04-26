const db = require("../db/db");
const tp = require("../utils/tokenParse");
const { validationResult } = require("express-validator");

class WordController {
  async updateWord(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const slug = request.params.slug;
      const { user_id } = request.body;
      const {
        learning_word,
        translation_verb,
        translation_noun,
        general_translate,
      } = request.body;
      const word = await db.query(
        `UPDATE
             word
         set learning_word = $1
         where learning_word = $2
           AND user_id = $3
         RETURNING * `,
        [learning_word, slug, user_id]
      );
      response.status(201).json(word.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Update error" });
    }
  }
}

module.exports = new WordController();
