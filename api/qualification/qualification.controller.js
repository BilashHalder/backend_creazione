const { all__, single__, add__, update__,remove__,} = require("./qualification.services");
const{pdfValidation,pdfUpload}=require('../../util/others');


/**send all the records form table */
const All__ = async (request, response) => {
  let alldata = await all__();
  if (!alldata) response.status(400).json({ message: "Internal Server Error" });
  else if (alldata.length == 0)
    response.status(404).json({ message: "No Data Found" });
  else response.json(alldata);
};



/**send single record that matched by given pramas */
const Single__ = async (request, response) => {
    if(isNaN(request.params.id))
    response.status(400).json({ message: "Invalid Id" });
    else{
        let data = await single__(request.params.id);
        if(!data)
        response.status(400).json({ message: "Internal Server Error" });
        else if (data.length == 0)
        response.status(404).json({ message: "No Data Found" });
             else response.json(data[0]);

    }
  
};


/**
 * Reomve single record that matched by given pramas
 */
const Remove__ = async (request, response) => {
  if(isNaN(request.params.id)){
    response.status(400).json({ message: "Invalid Request" }); 
}
else{    
let isRecord = await single__(request.params.id);
if (isRecord && isRecord.length) {
  let result = await remove__(request.params.id);
  if (result) response.status(200).json({ message: "Data Removed" });
  else response.status(400).json({ message: "Internal Server Error" });
} else response.status(400).json({ message: "Data Not Found" });
}
};



/**
 * Add New record in the table
 */

const Add__ = async (request, response) => {
    let {degree_name, year_of_pass, degree_from, marks, employee_id} = request.body;
    if(degree_name==undefined|| year_of_pass==undefined||degree_from==undefined||marks==undefined||employee_id==undefined)
    response.status(400).json({ message: "Invalid Data" });
    else if(request.files==null || request.files.doc==null)
    response.status(400).json({ message: "Invalid Request"});
    else if(!pdfValidation(request.files.doc))
    response.status(400).json({ message: "Invalid File"});
  else {
    let temp={degree_name, year_of_pass, degree_from, marks, employee_id};
    let fname=pdfUpload(request.files.doc);
    temp={...temp,document_url:fname}

    let result = await add__(temp);
    if (!result)
      response.status(400).json({ message: "Internal Server Error" });
    else response.status(200).json({ ...temp, id: result.insertId });
  }
};



/**
 * Update Existance record
 */


const Update__ = async (request, response) => {
  let isRecord = await single__(request.params.id);
  if (isRecord && isRecord.length) {
    let oldData = isRecord[0];
    let newData = request.body;

    ///////////////////**Compare & Update ///////////////////////

    if(newData.degree_name!=undefined && newData.degree_name!=oldData.degree_name)
    oldData={...oldData,degree_name:newData.degree_name};

    if(newData.year_of_pass!=undefined && newData.year_of_pass!=oldData.year_of_pass)
    oldData={...oldData,year_of_pass:newData.year_of_pass};

    if(newData.degree_from!=undefined && newData.degree_from!=oldData.degree_from)
    oldData={...oldData,degree_from:newData.degree_from};

    if(newData.marks!=undefined && newData.marks!=oldData.marks)
    oldData={...oldData,marks:newData.marks};

    if(newData.employee_id!=undefined && newData.employee_id!=oldData.employee_id)
    oldData={...oldData,employee_id:newData.employee_id};

    if(request.files!=undefined && request.files.doc!=undefined){
        if(!pdfValidation(request.files.doc)){
            response.status(400).json({ message: "Invalid File " });
          }
          else{
            let fname=pdfUpload(request.files.doc);
            oldData={...oldData,document_url:fname};
          }
    }

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
