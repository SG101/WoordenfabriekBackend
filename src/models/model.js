const mysql = require('mysql2/promise');
const config = require('../settings');

class Model {
  constructor(table) {
    this.table = table;
  }

  async select(columns, clause, values, clause2, values2) {
    const connection = await mysql.createConnection(config.connectionString,
      { multipleStatements: true });
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause2) {
      query += ` WHERE ${clause}  = ${values} AND ${clause2} = ${values2}`;
    } else if (clause) query += ` WHERE ${clause} = ${values}`;
    const [ results, ] = await connection.execute(query);
    return results;
  }

  async Update(params) {
    const connection = await mysql.createConnection(config.connectionString);
    var p;
    let query = `CALL ${this.table}(`;
    for (p in params) {
      query += p;
      query += ',';
    }
    query = query.substring(0, query.length - 1);
    query += ')';
    console.log(query);
    await connection.execute(query);
    return null;
  }
}

export default Model;
