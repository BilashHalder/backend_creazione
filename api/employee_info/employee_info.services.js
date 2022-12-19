const dbconfig = require("../../config/mysql.config");
const mysql = require("mysql2/promise");


/****
 * DataBase Query String
 ****/

let addQuery = "INSERT INTO employee_info(employee_id,designation_id,salary_id,leave_id,dob, report_to,joining_date,acceptance_file,id_card,last_payment) VALUES (?,?,?,?,?,?,?,?,?,?)";
let updateQuery = "UPDATE employee_info SET employee_id=?,designation_id=?,salary_id=?,leave_id=?,dob=?,report_to=?,joining_date=?,acceptance_file=?,id_card=?,last_payment=? WHERE id=?";
let allQuery = "SELECT * FROM employee_info";
let signleQuery = "SELECT * FROM employee_info WHERE id=?";
let removeQuery = "DELETE FROM employee_info WHERE id=?";


const add__ = async (data) => {
    let {employee_id,designation_id,salary_id,leave_id,dob, report_to,joining_date,acceptance_file,id_card,last_payment}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(addQuery, [employee_id,designation_id,salary_id,leave_id,dob, report_to,joining_date,acceptance_file,id_card,last_payment]);
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
    let {employee_id,designation_id,salary_id,leave_id,dob, report_to,joining_date,acceptance_file,id_card,last_payment,id}=data;
    let connection = await mysql.createConnection(dbconfig);
    try {
      connection = await mysql.createConnection(dbconfig);
      const [rows, fields] = await connection.execute(updateQuery, [employee_id,designation_id,salary_id,leave_id,dob, report_to,joining_date,acceptance_file,id_card,last_payment,id]);
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
