var fs = require("fs");
var path = require("path");



const imageValidation = (image) => {
    let maxSize = 2000000;
    fileExt = image.name.split('.').at(-1);
    if (fileExt != 'jpg' && fileExt != 'jpeg' && fileExt != 'png')
        return false;
    else if (image.size > maxSize)
        return false;
    else
        return true;
}

const imageUpload=(image)=>{
    let fileExt = image.name.split('.').at(-1);
    let newName = image.md5 + '__' + Date.now() + '' + '.' + fileExt;
    let uploadPath = (__dirname + '/../uploads/images/' + newName);
    image.mv(uploadPath, (err)=> {
        if(err)
        return false;
        else 
        return newName;
    });
    return newName;
}


const pdfValidation = (pdf) => {
    let maxSize = 5000000;
    fileExt = pdf.name.split('.').at(-1);
    if (fileExt != 'pdf')
        return false;
    else if (pdf.size > maxSize)
        return false;
    else
        return true;
}



const pdfUpload=(pdf)=>{
    let fileExt = pdf.name.split('.').at(-1);
    let newName = pdf.md5 + '__' + Date.now() + '' + '.' + fileExt;
    let uploadPath = (__dirname + '/../uploads/documents/' + newName);
    pdf.mv(uploadPath, (err)=> {
        if(err)
            return false;
        else 
        return newName;
    });
    return newName;
}


const dateToMysqlDate=(date)=>{

}


const mysqlDateToDate=(date)=>{

}



const CurrentDateTime=()=>{
    let date = new Date().toJSON();
    let temp=date.split('T');
    let obj={
        date:temp[0],
        time:temp[1]
    }
    return obj;
}


module.exports = { imageValidation ,imageUpload,pdfValidation,pdfUpload,dateToMysqlDate,mysqlDateToDate,CurrentDateTime};

