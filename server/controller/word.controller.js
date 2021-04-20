const db = require("../db/db");
const tp = require("../utils/tokenParse");
const { validationResult } = require("express-validator");

class WordController {
  async getWords(request, response) {
    try {
      const user_id = tp.tokenParse(request.headers.authorization).user_id;
      // const word = await db.query(`SELECT word.learning_word,
      //                                     translation_verb.translation_verb,
      //                                     translation_noun.translation_noun,
      //                                     translation_general.translation_general
      //                              FROM word
      //                                       FULL OUTER JOIN translation_verb ON word.id = translation_verb.word_id
      //                                       FULL OUTER JOIN translation_noun ON word.id = translation_noun.word_id
      //                                       FULL OUTER JOIN translation_general ON word.id = translation_general.word_id
      //                              WHERE word.user_id = $1`,
      //   [user_id]);
      const learning_words = await db.query(
        `SELECT *
         FROM word
         WHERE word.user_id = $1`,
        [user_id]
      );
      return response.status(200).json(learning_words.rows);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Get error" });
    }
  }

  async getWord(request, response) {
    try {
      try {
        const user_id = tp.tokenParse(request.headers.authorization).user_id;
      } catch (e) {
        return response
          .status(400)
          .json({ message: "You aren't authorization" });
      }
      const user_id = tp.tokenParse(request.headers.authorization).user_id;
      const request_word = request.params.word;
      const word = await db.query(
        `SELECT *
         FROM word
         WHERE word.user_id = $1
           AND learning_word = $2`,
        [user_id, request_word]
      );

      const translation_verb = await db.query(
        `SELECT *
         FROM translation_verb
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      const translation_noun = await db.query(
        `SELECT *
         FROM translation_noun
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      const translation_general = await db.query(
        `SELECT *
         FROM translation_general
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      response.status(200).json({
        word: word.rows[0].learning_word,
        verb: translation_verb.rows,
        noun: translation_noun.rows,
        general: translation_general.rows,
      });
    } catch (e) {
      console.log(e);
      return response.status(400).json({ message: "Get error" });
    }
  }

  async getRandomWord(request, response) {
    try {
      try {
        const user_id = tp.tokenParse(request.headers.authorization).user_id;
      } catch (e) {
        return response
          .status(400)
          .json({ message: "You aren't authorization" });
      }
      const user_id = tp.tokenParse(request.headers.authorization).user_id;
      const word = await db.query(
        `SELECT *
         FROM word
         WHERE word.user_id = $1
         ORDER BY RANDOM()
         LIMIT 1`,
        [user_id]
      );

      const translation_verb = await db.query(
        `SELECT *
         FROM translation_verb
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      const translation_noun = await db.query(
        `SELECT *
         FROM translation_noun
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      const translation_general = await db.query(
        `SELECT *
         FROM translation_general
         WHERE word_id = $1`,
        [word.rows[0].id]
      );
      response.status(200).json({
        word: word.rows[0],
        verb: translation_verb.rows,
        noun: translation_noun.rows,
        general: translation_general.rows,
      });
    } catch (e) {
      console.log(e);
      return response.status(400).json({ message: "Get error" });
    }
  }

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

  async deleteWord(request, response) {
    try {
      const { user_id } = request.body;
      const slug = request.params.slug;
      const word = await db.query(
        `
            DELETE
            FROM word
            where learning_word = $1
              AND user_id = $2`,
        [slug, user_id]
      );
      response.status(200).json(word.rows[0]);
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: "Delete error" });
    }
  }
}

module.exports = new WordController();
