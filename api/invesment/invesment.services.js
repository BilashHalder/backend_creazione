const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO investment(user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file, status,is_send,referral_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE investment SET user_id=?,user_type=?,ammount=?,roi=?,nominee_id=?,account_no=?,payment_id=?,agreement_file=?,status=?,is_send=?,referral_id=? WHERE id=?";
let allQuery = "SELECT * FROM investment";
let signleQuery = "SELECT * FROM investment WHERE id=?";
let removeQuery = "DELETE FROM investment WHERE id=?";


const add__ = async (data) => {
    let {user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file, status,is_send,referral_id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file, status,is_send,referral_id]);
      return rows;
    } catch (error) {
      console.log(error)
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
    let {user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file, status,is_send,referral_id,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [user_id,user_type,ammount,roi,nominee_id,account_no,payment_id,agreement_file, status,is_send,referral_id,id]);
      return rows;
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

module.exports = { all__,single__,add__,update__,remove__ };
