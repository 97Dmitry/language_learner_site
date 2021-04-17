const db = require("../db/db")
const tp = require("../utils/tokenParse")
const {validationResult} = require("express-validator")


class WordController {
  async addLearningWord(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const user_id = tp.tokenParse(request.headers.authorization).id
      const {learning_word} = request.body
      const newWord = await db.query(
        `INSERT INTO word (learning_word, user_id)
         VALUES ($1, $2)
         RETURNING *`,
        [learning_word, user_id]
      );
      response.status(201).json(newWord.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Create error"})
    }
  }

  async addTranslationVerb(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {word_id, translation_verb} = request.body
      const newWord = await db.query(
        `INSERT INTO translation_verb (word_id, translation_verb)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, translation_verb]
      );
      response.status(201).json(newWord.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Create error"})
    }
  }

  async addTranslationNoun(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {word_id, translation_noun} = request.body
      const newWord = await db.query(
        `INSERT INTO translation_noun (word_id, translation_noun)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, translation_noun]
      );
      response.status(201).json(newWord.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Create error"})
    }
  }

  async addTranslationGeneral(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {word_id, general_translation} = request.body
      const newWord = await db.query(
        `INSERT INTO general_translate (word_id, general_translation)
         VALUES ($1, $2)
         RETURNING *`,
        [word_id, general_translation]
      );
      response.status(201).json(newWord.rows[0])
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Create error"})
    }
  }

  async getWords(request, response) {
    try {
      const {user_id} = request.body
      const word = await db.query(`SELECT *
                                   FROM word
                                   WHERE user_id = $1`,
        [user_id]);
      response.status(200).json(word.rows)
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Get error"})
    }
  }

  async getWord(request, response) {
    try {
      const slug = request.params.slug
      const {user_id} = request.body
      const word = await db.query(`SELECT *
                                   FROM word
                                   where learning_word = $1
                                     AND user_id = $2`,
        [slug, user_id])
      response.status(200).json(word.rows[0]);
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Get error"})
    }
  }

  async updateWord(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const slug = request.params.slug
      const {user_id} = request.body
      const {learning_word, translation_verb, translation_noun, general_translate} = request.body
      const word = await db.query(`UPDATE word
                                   set learning_word     = $1
                                   where learning_word = $2
                                     AND user_id = $3
                                   RETURNING *`,
        [learning_word, slug, user_id])
      response.status(201).json(word.rows[0]);
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Update error"})
    }
  }

  async deleteWord(request, response) {
    try {
      const {user_id} = request.body
      const slug = request.params.slug
      const word = await db.query(`DELETE
                                   FROM word
                                   where learning_word = $1
                                     AND user_id = $2`,
        [slug, user_id])
      response.status(200).json(word.rows[0]);
    } catch (e) {
      console.log(e)
      response.status(400).json({message: "Delete error"})
    }
  }
}

module.exports = new WordController()