// Requiring module
require('dotenv').config();
const dbconfig=require('./config/mysql.config')
const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql2/promise');


// Creating express object
const app = express();



/***********************************
 *       All Middlewares
 **********************************/

app.use(cors());
app.use(express.json());
app.use(fileUpload());




/************Export All Api Routes */


const AssociateRouter=require('./api/associate/associate.route');
// const DesignationRouter=require('./api/designation/designation.route');
const SalaryRouter=require('./api/salary/salary.route');
// const LeaveRouter=require('./api/leave/leave.route');
// const HolidaysRouter=require('./api/holidays/holidays.router');





const BankAccountRouter=require('./api/account/account.route');
// const KycRouter=require('./api/kyc/kyc.route');
// const NomineeRouter=require('./api/nominee/nominee.route');
// const QualificationRouter=require('./api/qualification/qualification.route');

// const PayoutRouter=require('./api/payout/payout.route');










/************End Export All Api Routes***************/


/***************Api Routings*********************/






app.use("/api/associate",AssociateRouter);
app.use("/api/salary",SalaryRouter);
// app.use("/api/leave",LeaveRouter);
// app.use("/api/designation",DesignationRouter);
// app.use("/api/holiday",HolidaysRouter);


app.use("/api/account",BankAccountRouter);
// app.use("/api/kyc",KycRouter);
// app.use("/api/nominee",NomineeRouter);
// app.use("/api/qualification",QualificationRouter);


// app.use("/api/payout",PayoutRouter);












/**************************End Api Routing *********/

// Function to serve all static files
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/docs', express.static('docs'));








/***************Deafult Routings*********************/
app.get("/", (request, response) => {
    response.send("API Documentation");
});


app.get("/status", (request, response) => {
        response.status(200).json({
        message: "Connection Established"
    });
});


/****************************************
 * To handle all invalid request
 * **************************************/

app.all("*", (request, response) => {
    response.status(500).json({
        message: "invalid request"
    });
});


// Server setup & test
app.listen(process.env.SERVER_PORT, async () => {
console.log(process.env.ENV_TEST);
const connection = await mysql.createConnection(dbconfig);
try {
    const [rows, fields] = await connection.execute('SELECT CURRENT_TIME', []); 
    console.log(`Mysql Server Connected Time is ${rows[0].CURRENT_TIME}`)  
} catch (error) {
    console.log(`Mysql Server Not Connected ${error.code}`);
}
connection.end();
console.log(`Api Server Running  on PORT No ${process.env.SERVER_PORT}...`);
});