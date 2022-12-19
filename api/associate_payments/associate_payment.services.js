const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO payout(associate_id,amount,account_no,ifsc_code,month, year,status,reference_id) VALUES (?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE payout SET associate_id=?,amount=?,account_no=?,ifsc_code=?,month=?,year=?,status=?,reference_id=? WHERE id=?";
let allQuery = "SELECT * FROM payout";
let signleQuery = "SELECT * FROM payout WHERE id=?";
let removeQuery = "DELETE FROM payout WHERE id=?";


const add__ = async (data) => {
    let {associate_id,amount,account_no,ifsc_code,month, year,status,reference_id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [associate_id,amount,account_no,ifsc_code,month, year,status,reference_id]);
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
    let {associate_id,amount,account_no,ifsc_code,month, year,status,reference_id,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [associate_id,amount,account_no,ifsc_code,month, year,status,reference_id,id]);
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
