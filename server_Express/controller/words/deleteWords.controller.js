const db = require("../../db/db");
const tp = require("../../utils/tokenParse");

class DeleteWordsController {
  async deleteWord(request, response) {
    try {
      const { delete_target, word_id } = request.body;
      const word = await db.query(
        `DELETE
         FROM word
         where user_id = $1
           AND learning_word = $2
           AND id = $3`,
        [user_id, delete_target, word_id]
      );
      response.status(200).json(word.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }

  async deleteTranslationVerb(request, response) {
    try {
      const { word_id, verb_id } = request.body;

      const verb = await db.query(
        `DELETE
         FROM translation_verb
         where word_id = $1
           AND id = $2`,
        [word_id, verb_id]
      );
      response.status(200).json(verb.rows[0]);
    } catch (e) {
      // console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }

  async deleteTranslationNoun(request, response) {
    try {
      const { word_id, noun_id } = request.body;
      const noun = await db.query(
        `DELETE
         FROM translation_noun
         where word_id = $1
           AND id = $2`,
        [word_id, noun_id]
      );
      response.status(200).json(noun.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }

  async deleteTranslationGeneral(request, response) {
    try {
      const { word_id, general_id } = request.body;
      const general = await db.query(
        `DELETE
         FROM translation_general
         where word_id = $1
           AND id = $2`,
        [word_id, general_id]
      );
      response.status(200).json(general.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }
}

module.exports = new DeleteWordsController();
