const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO employee(name,gender,email,phone,balance,pass,image,status) VALUES (?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE employee SET name=?,gender=?,email=?,phone=?,balance=?,pass=?,image=?,status=? WHERE id=?";
let allQuery = "SELECT * FROM employee";
let signleQuery = "SELECT * FROM employee WHERE id=?";
let removeQuery = "DELETE FROM employee WHERE id=?";
let emailphoneQuery = "SELECT * FROM employee email=? OR phone=?";
let balanceUpdateQuery = "UPDATE employee SET balance=? WHERE id=?";



const add__ = async (data) => {
    let {name,gender,email,phone,balance,referred_by,pass,image,status,referral_key}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [name,gender,email,phone,balance,referred_by,pass,image,status,referral_key]);
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
    let {name,gender,email,phone,balance,referred_by,pass,image,status,referral_key,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [name,gender,email,phone,balance,referred_by,pass,image,status,referral_key,id]);
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

  const isexist__ = async (emailphone) => {
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(emailphoneQuery, [emailphone,emailphone]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };

  

  const balanceupdate__ = async (data) => {
    let {balance,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(balanceUpdateQuery, [balance,id]);
      return rows;
    } catch (error) {
      return false;
    } finally {
      connection.end();
    }
  };


  
module.exports = { all__,single__,add__,update__,remove__,isexist__,balanceupdate__ };
