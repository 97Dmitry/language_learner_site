const db = require("../db")

class wordController {
  async addWord(request, response) {
    const {learning_word, translation_verb, translation_noun, general_translate, user_id} = request.body
    const newWord = await db.query(
      `INSERT INTO word (learning_word, translation_verb, translation_noun, general_translate, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [learning_word, translation_verb, translation_noun, general_translate, user_id]
    );
    response.json(newWord.rows[0])
  }

  async getWords(request, response) {
    const {user_id} = request.body
    const word = await db.query(`SELECT *
                                 FROM word
                                 WHERE user_id = $1`,
      [user_id])
    response.json(word.rows)
  }

  async getWord(request, response) {
    const slug = request.params.slug
    const {user_id} = request.body
    const word = await db.query(`SELECT *
                                 FROM word
                                 where learning_word = $1
                                   AND user_id = $2`,
      [slug, user_id])
    response.json(word.rows[0])
  }

  async updateWord(request, response) {
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
    response.json(word.rows[0])
  }

  async deleteWord(request, response) {
    const {user_id} = request.body
    const slug = request.params.slug
    const word = await db.query(`DELETE
                                 FROM word
                                 where learning_word = $1
                                   AND user_id = $2`,
      [slug, user_id])
    response.json(word.rows[0])
  }
}

module.exports = new wordController()