const mysql = require('mysql2/promise');
const dbconfig ={
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password:'',
    database: 'creazione'
  }
  
  
  module.exports = dbconfig;