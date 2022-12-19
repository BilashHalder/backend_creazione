const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO account(account_no,ifsc_code,bank,user_id,user_type,status) VALUES (?,?,?,?,?,1)";
let updateQuery = "UPDATE account SET account_no=?,ifsc_code=?,bank=?,user_id=?,user_type=?,status=? WHERE id=?";
let allQuery = "SELECT * FROM account";
let signleQuery = "SELECT * FROM account WHERE id=?";
let removeQuery = "DELETE FROM account WHERE id=?";
let useraccountsQuery="SELECT * FROM account WHERE user_id=? AND user_type=?";
let accountexistQuery="SELECT * FROM account WHERE account_no=?"


const add__ = async (data) => {
    let {account_no,ifsc_code,bank,user_id,user_type}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [account_no,ifsc_code,bank,user_id,user_type]);
      return rows;
    } catch (error) {
      console.log(error.sqlMessage)
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
    console.log(data)
    let {account_no,ifsc_code,bank,user_id,user_type,status,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [account_no,ifsc_code,bank,user_id,user_type, status,id]);
      return true;
    } catch (error) {
      console.log(error)
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

  const users__ = async (data) => {
    const {user_id,user_type}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(useraccountsQuery, [user_id,user_type]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };

  const isexist__ = async (acn_num) => {
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(accountexistQuery, [acn_num]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };

module.exports = { all__,single__,add__,update__,remove__,users__ ,isexist__};
