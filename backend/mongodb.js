// Connection singleton - handles connection to mongodb database
const { MongoClient } = require("mongodb")
const connectionStr = require("./connectionSTR")
class Connection {
  // returns a connection if it exists, else creates it
  static async open() {
    if (this.db) return this.db
    this.db = await MongoClient.connect(this.url)
    return this.db
  }
}

Connection.db = null
Connection.url = connectionStr
module.exports = { Connection }
