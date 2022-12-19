const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const mysql = require('mysql2/promise');
const dbconfig=require('./config/mysql.config')

const {sendEmail,resetTemplate}=require('./util/emails')

async function createPDF(data){

	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/pdf/payslip.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	var html = template(data);

	var milis = new Date();
	milis = milis.getTime();

	var pdfPath = path.join('public/docs', `${'test'}-${milis}.pdf`);

	var options = {
		width: '1200px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "0px",
			bottom: "0px"
		},
		printBackground: true,
		path: pdfPath
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options);
	await browser.close();
}

const data = {
	title: "A new Brazilian School",
	date: "05/12/2018",
	name: "Test Employee",
    id:'CRZNEMP202201',
	age: 28,
	birthdate: "12/07/1990",
	course: "Computer Science",
	obs: "Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce."
}

// createPDF(data);

// console.log(sendEmail('ibilashhalder@gmail.com','This is Test Email',resetTemplate()))


async function main() {

	const connection = await mysql.createConnection(dbconfig);
	// query database
	connection.beginTransaction();
	try {
		const [rows, fields] = await connection.execute('SELECT * FROM salary', []);
		console.log(rows)
		connection.commit(()=>{
			console.log('commit')
		});
	} catch (error) {
		console.log(error.sqlMessage)
		connection.rollback();
	}
	finally{
		console.log('close')
		connection.end();
	}
	
  }





  main()