const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO leave_category(annual,casual,sick,maternity,bereavement,others) VALUES (?,?,?,?,?,?)";
let updateQuery = "UPDATE leave_category SET annual=?,casual=?,sick=?,maternity=?,bereavement=?,others=? WHERE id=?";
let allQuery = "SELECT * FROM leave_category";
let signleQuery = "SELECT * FROM leave_category WHERE id=?";
let removeQuery = "DELETE FROM leave_category WHERE id=?";


const add__ = async (data) => {
    let {annual,casual,sick,maternity, bereavement,others}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [annual,casual,sick,maternity, bereavement,others]);
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
      console.log(error)
      return false;
    } finally {
      connection.end();
    }
  };


  const update__ = async (data) => {
    let {annual,casual,sick,maternity, bereavement,others,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [annual,casual,sick,maternity, bereavement,others,id]);
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
