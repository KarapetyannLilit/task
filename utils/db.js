const mysql = require("mysql2")
const util = require("util")
require("dotenv").config()

const MYSQL = {
  host: `${process.env.MYSQL_HOST}`,
  port: `${process.env.MYSQL_PORT}`,
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  database: `${process.env.MYSQL_DATABASE}`,
}
const mysqlConnection = (config) => {
  const connection = mysql.createConnection(config)
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args)
    },
    close() {
      return util.promisify(connection.end).call(connection)
    },
  }
}

module.exports = mysqlConnection(MYSQL)
