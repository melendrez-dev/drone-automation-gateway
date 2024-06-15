const mysql2 = require('mysql2/promise')
const dbConfig = require('../config/config')

class Repository {
  constructor() {
    this.pool = mysql2.createPool(dbConfig)
  }

  async findAll() {
    let query = 'SELECT * FROM events;'

    const results = await this.pool.query(query)

    return { events: results[0] }
  }

  async create(body) {
    let query = `INSERT INTO events ?;`

    const results = await this.pool.execute(query, body)

    return results
  }

  async findOne(id) {
    let query = 'SELECT * FROM events WHERE id=?;'

    const results = await this.pool.query(query, [id])

    return results[0]
  }

  async update(id, body) {
    let query = `UPDATE events SET ? WHERE id = ?;`

    const results = await this.pool.query(query, body, id)

    return results[0]
  }
}

module.exports = Repository
