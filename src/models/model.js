import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause, values, clause2, values2) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause2) {
      query += ` WHERE ${clause}  = ${values} AND ${clause2} = ${values2}`;
    } else if (clause) query += ` WHERE ${clause} = ${values}`;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }
}

export default Model;
