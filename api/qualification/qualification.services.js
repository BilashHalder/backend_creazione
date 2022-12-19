const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO qualification(degree_name,year_of_pass,degree_from,marks,document_url,employee_id) VALUES (?,?,?,?,?,?)";
let updateQuery = "UPDATE qualification SET degree_name=?,year_of_pass=?,degree_from=?,marks=?,document_url=?,employee_id=? WHERE id=?";
let allQuery = "SELECT * FROM qualification";
let signleQuery = "SELECT * FROM qualification WHERE id=?";
let removeQuery = "DELETE FROM qualification WHERE id=?";


const add__ = async (data) => {
    let {degree_name,year_of_pass,degree_from,marks,document_url,employee_id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [degree_name,year_of_pass,degree_from,marks,document_url,employee_id]);
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
    let {degree_name,year_of_pass,degree_from,marks,document_url,employee_id,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [degree_name,year_of_pass,degree_from,marks,document_url,employee_id,id]);
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
