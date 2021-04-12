const db = require("../db")
const {validationResult} = require("express-validator")


class wordController {
  async addWord(request, response) {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        return response.status(400).json(errors)
      }
      const {learning_word, translation_verb, translation_noun, general_translate, user_id} = request.body
      const newWord = await db.query(
        `INSERT INTO word (learning_word, translation_verb, translation_noun, general_translate, user_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [learning_word, translation_verb, translation_noun, general_translate, user_id]
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
                                   set learning_word     = $1,
                                       translation_verb  = $2,
                                       translation_noun  = $3,
                                       general_translate = $4
                                   where learning_word = $5
                                     AND user_id = $6
                                   RETURNING *`,
        [learning_word, translation_verb, translation_noun, general_translate, slug, user_id])
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

module.exports = new wordController()