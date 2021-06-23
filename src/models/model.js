const mysql = require('mysql2/promise');
const config = require('../settings');

class Model {
  constructor(table) {
    this.table = table;
  }

  async select(columns, clause, values, clause2, values2) {
    const connection = await mysql.createConnection(config.connectionString);
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause2) {
      query += ` WHERE ${clause}  = ${values} AND ${clause2} = ${values2}`;
    } else if (clause) query += ` WHERE ${clause} = ${values}`;
    console.log(query);
    const [ results, ] = await connection.execute(query);
    return results;
  }
}

export default Model;
