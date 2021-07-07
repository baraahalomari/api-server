'use strict';
const pool = require('../../pool');
class Collection {
  constructor(tabel){
    this.tabel = tabel;
  }
  create(obj){
    const sql = `INSERT INTO ${this.tabel} (name,price) VALUES ($1,$2) RETURNING *;`;
    console.log(sql);
    const safeValues = [obj.name, obj.price];
    return pool.query(sql, safeValues);
  }
  read(id) {
    if (id) {
      return pool.query(`SELECT * FROM ${this.tabel} WHERE id=$1;`,[id]);
    }
    return pool.query(`SELECT * FROM ${this.tabel};`);
  }
  update(id, obj) {
    const sql = `UPDATE ${this.tabel} SET name=$1,price=$2 WHERE id=$3 RETURNING *;`;
    const safeValues = [obj.name, obj.price, id];
    return pool.query(sql, safeValues);
  }
  delete(id) {
    return pool.query(`DELETE FROM ${this.tabel} WHERE id=$1 RETURNING *;`,[id] );
  }
}
module.exports = Collection;