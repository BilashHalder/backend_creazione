const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO salary(employee_id,account_no,ifsc_code,month,year,amount,status,transaction_id) VALUES (?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE salary SET employee_id=?,account_no=?,ifsc_code=?,month=?,year=?,amount=?,status=?,transaction_id=? WHERE id=?";
let allQuery = "SELECT * FROM salary";
let signleQuery = "SELECT * FROM salary WHERE id=?";
let removeQuery = "DELETE FROM salary WHERE id=?";


const add__ = async (data) => {
    let {employee_id,account_no,ifsc_code,month,year,amount,status,transaction_id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [employee_id,account_no,ifsc_code,month,year,amount,status,transaction_id]);
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
    let {employee_id,account_no,ifsc_code,month,year,amount,status,transaction_id,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [employee_id,account_no,ifsc_code,month,year,amount,status,transaction_id,id]);
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
