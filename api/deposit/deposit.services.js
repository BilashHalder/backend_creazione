const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO deposit(mode,doc,reference,remarks,status,amount,user_id,user_type) VALUES (?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE deposit SET mode=?,doc=?,reference=?,remarks=?,status=?,amount=?,user_id=?,user_type=? WHERE id=?";
let allQuery = "SELECT * FROM deposit";
let signleQuery = "SELECT * FROM deposit WHERE id=?";
let removeQuery = "DELETE FROM deposit WHERE id=?";


const add__ = async (data) => {
    let {mode,doc,reference,remarks,status,amount,user_id,user_type}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [mode,doc,reference,remarks,status,amount,user_id,user_type]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };

const all__ = async (data) => {
  let connection = await mysql.createConnection(dbconfig);
  try {
    connection = await mysql.createConnection(dbconfig);
    const [rows, fields] = await connection.execute(allQuery, []);
    return rows;
  } catch (error) {
    return false;
  } finally {
    connection.end();
  }
};



const single__ = async (id) => {
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(signleQuery, [id]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };


  const update__ = async (data) => {
    let {mode,doc,reference,remarks,status,amount,user_id,user_type,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [mode,doc,reference,remarks,status,amount,user_id,user_type,id]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };


  const remove__ = async (id) => {
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(removeQuery,[id]);
      return true;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };

module.exports = { all__,single__,add__,update__,remove__ };
