const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");


const options = {
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





const salaryPdf=async(data)=>{
let templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/pdf/payslip.html'), 'utf8');
template = handlebars.compile(templateHtml);
html = template(data);
var pdfPath = path.join('public/docs', `${data.id}-${data.month}${data.year}.pdf`);
const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
});
await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    waitUntil: 'networkidle0'
});

await page.pdf(options);
await browser.close();
}

const appointmentPdf=async(data)=>{
    let templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/pdf/appointment_letter.html'), 'utf8');
    template = handlebars.compile(templateHtml);
    html = template(data);
    var pdfPath = path.join('public/docs', `${data.id}-${data.name}${'appointment_letter'}.pdf`);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
    });
    
    await page.pdf(options);
    await browser.close();
    }

    const offerLetterPdf=async(data)=>{
        let templateHtml = fs.readFileSync(path.join(process.cwd(), 'templates/pdf/offer_letter.html'), 'utf8');
        template = handlebars.compile(templateHtml);
        html = template(data);
        var pdfPath = path.join('public/docs', `${data.id}-${data.name}${'offer_letter'}.pdf`);
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            headless: true
        });
        await page.goto(`data:text/html;charset=UTF-8,${html}`, {
            waitUntil: 'networkidle0'
        });
        
        await page.pdf(options);
        await browser.close();
        }

module.exports={salaryPdf,appointmentPdf,offerLetterPdf}


