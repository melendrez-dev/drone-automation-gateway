require('dotenv').config()

if (!process.env.MYSQL_HOST) {
  throw new Error('MySQL HOST required')
}

if (!process.env.MYSQL_USER) {
  throw new Error('MySQL USER required')
}

if (!process.env.MYSQL_PASSWORD) {
  throw new Error('MySQL MYSQL_PASSWORD required')
}

if (!process.env.MYSQL_DB) {
  throw new Error('MySQL MYSQL_DB required')
}

if (!process.env.MYSQL_PORT) {
  throw new Error('MySQL MYSQL_PORT required')
}

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

module.exports = dbConfig
