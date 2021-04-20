const db = require("../../db/db");
const tp = require("../../utils/tokenParse");
const { validationResult } = require("express-validator");

class ChangeDataWordsController {
  async changeKnowledgeValue(request, response) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json(errors);
      }
      const user_id = tp.tokenParse(request.headers.authorization).user_id;
      const { newValueKnowledge, word_id } = request.body;

      const word = await db.query(
        `SELECT *
         FROM word
         WHERE user_id = $1
           AND id = $2`,
        [user_id, word_id]
      );
      if (!word.rows.length) {
        return response.status(404).json({
          message: "This word found in your collection. You need relog",
        });
      }

      const newWordStatus = await db.query(
        `UPDATE word
         SET knowledge = $1
         WHERE user_id = $2
           AND id = $3`,
        [newValueKnowledge, user_id, word_id]
      );
      return response.status(200).json("Word knowledge value updated");
    } catch (e) {
      console.log(e);
      return response.status(500).json("Glitched update word knowledge");
    }
  }
}

module.exports = new ChangeDataWordsController();
