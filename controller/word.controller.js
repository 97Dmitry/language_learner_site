const db = require("../db")

class wordController {
  async addWord(request, response) {
    const {learning_word, translation_verb, translation_noun, general_translate} = request.body
    const newWord = await db.query(
      `INSERT INTO word (learning_word, translation_verb, translation_noun, general_translate)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [learning_word, translation_verb, translation_noun, general_translate]
    );
    response.json(newWord.rows[0])
  }

  async getWords(request, response) {
    const word = await db.query(`SELECT *
                                 FROM word`)
    response.json(word.rows)
  }

  async getWord(request, response) {
    const slug = request.params.slug
    const word = await db.query(`SELECT *
                                 FROM word
                                 where learning_word = $1`, [slug])
    response.json(word.rows[0])
  }

  async updateWord(request, response) {
    const {slug, learning_word, translation_verb, translation_noun} = request.body
    const word = await db.query(`UPDATE word
                                 set learning_word    = $1,
                                     translation_verb = $2,
                                     translation_noun = $3,
                                     general_translate= $4
                                 where learning_word = $5
                                 RETURNING *`, [learning_word, translation_verb, translation_noun, general_translate, slug])
    response.json(word)
  }

  async deleteWord(request, response) {
    const slug = request.params.slug
    const word = await db.query(`DELETE
                                 FROM word
                                 where learning_word = $1`, [slug])
    response.json(word.rows[0])
  }
}

module.exports = new wordController()