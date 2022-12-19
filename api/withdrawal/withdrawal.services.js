const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO withdrawal(user_type,user_id,amount,account,ifsc_code, reference_id,status) VALUES (?,?,?,?,?,?,?)";
let updateQuery = "UPDATE withdrawal SET user_type=?,user_id=?,amount=?,account=?,ifsc_code=?,reference_id=?,status=? WHERE id=?";
let allQuery = "SELECT * FROM withdrawal";
let signleQuery = "SELECT * FROM withdrawal WHERE id=?";
let removeQuery = "DELETE FROM withdrawal WHERE id=?";


const add__ = async (data) => {
    let {user_type,user_id,amount,account,ifsc_code, reference_id,status}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [user_type,user_id,amount,account,ifsc_code, reference_id,status]);
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
    let {user_type,user_id,amount,account,ifsc_code, reference_id,status,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [user_type,user_id,amount,account,ifsc_code, reference_id,status,id]);
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
