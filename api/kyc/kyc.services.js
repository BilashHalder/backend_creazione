const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO kyc(adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type) VALUES (?,?,?,?,?,?,?)";
let updateQuery = "UPDATE kyc SET adhar_no=?,pan_no=?,address=?,adhar_verified=?,pan_verified=?,user_id=?,user_type=? WHERE id=?";
let allQuery = "SELECT * FROM kyc";
let signleQuery = "SELECT * FROM kyc WHERE id=?";
let removeQuery = "DELETE FROM kyc WHERE id=?";
let isExistQuery = "SELECT * FROM kyc WHERE user_type=? AND user_type=?";

const add__ = async (data) => {
    let {adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type]);
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
    let {adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [adhar_no,pan_no,address,adhar_verified,pan_verified,user_id,user_type,id]);
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

  const isexist__ = async (data) => {
    const {user_id,user_type}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(isExistQuery, [user_id,user_type]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };


module.exports = { all__,single__,add__,update__,remove__,isexist__ };
