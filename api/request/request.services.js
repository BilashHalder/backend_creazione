const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO request(name,subject,message,email,phone,request_type,status) VALUES (?,?,?,?,?,?,?)";
let updateQuery = "UPDATE request SET name=?,subject=?,message=?,email=?,phone=?,remarks=?,request_type=?,status=? WHERE id=?";
let allQuery = "SELECT * FROM request";
let signleQuery = "SELECT * FROM request WHERE id=?";
let removeQuery = "DELETE FROM request WHERE id=?";


const add__ = async (data) => {
    let {name,subject,message,email,phone,remarks,request_type,status}=data;
    console.log(data)
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [name,subject,message,email,phone,request_type,status]);
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
    let {name,subject,message,email,phone,remarks,request_type,status,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [name,subject,message,email,phone,remarks,request_type,status,id]);
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
