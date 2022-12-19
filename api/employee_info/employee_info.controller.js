const { all__, single__, add__, update__,remove__,isexists__} = require("./employee_info.services");
const { pdfValidation, pdfUpload } = require('../../util/others');

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
  let data = await single__(request.params.id);
  if (!(data)) 
  response.status(400).json({ message: "Internal Server Error" });
  else if (data.length == 0)
    response.status(404).json({ message: "No Data Found" });
  else response.json(data[0]);
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
    let {employee_id,designation_id,salary_id,leave_id,dob,report_to,joining_date}=request.body;
   if(employee_id==undefined|| designation_id==undefined || salary_id==undefined ||  leave_id==undefined || dob==undefined || report_to==undefined ||joining_date==undefined)
    response.status(404).json({ message: "invalid data" });
  else {
    let flag=await isexists__(employee_id);
    if(!flag || flag.length==0){
        let data={employee_id,designation_id,salary_id,leave_id,dob,report_to, joining_date,acceptance_file:null,id_card:null}
        let result = await add__(data);
        if (!result)
          response.status(400).json({ message: "Internal Server Error" });
        else 
        response.status(200).json({ ...data, id: result.insertId });
    }
    else
        response.status(200).json(flag[0]);
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

    if (newData.employee_id != undefined && newData.employee_id != oldData.employee_id)
    oldData = { ...oldData, employee_id: newData.employee_id };

    if (newData.designation_id != undefined && newData.designation_id != oldData.designation_id)
    oldData = { ...oldData, designation_id: newData.designation_id };

    if (newData.salary_id != undefined && newData.salary_id != oldData.salary_id)
    oldData = { ...oldData, salary_id: newData.salary_id };

    if (newData.leave_id != undefined && newData.leave_id != oldData.leave_id)
    oldData = { ...oldData, leave_id: newData.leave_id };


    if (newData.dob != undefined && newData.dob != oldData.dob)
    oldData = { ...oldData, dob: newData.dob };


    if (newData.report_to != undefined && newData.report_to != oldData.report_to)
    oldData = { ...oldData, report_to: newData.report_to };

    if (newData.joining_date != undefined && newData.joining_date != oldData.joining_date)
    oldData = { ...oldData, joining_date: newData.joining_date };

    if (newData.id_card != undefined && newData.id_card != oldData.id_card)
    oldData = { ...oldData, id_card: newData.id_card };

    let errmsg=null;
        if(request.files && request.files.acceptance_file)
          {
            acpfile=request.files.acceptance_file;
            if(!pdfValidation(acpfile))
            errmsg = 'Invalid File';
            let fu =  pdfUpload(acpfile);
            if (!fu)
             errmsg = "Internal Server Error";
              else
              oldData = { ...oldData, acceptance_file: fu }
          }
          if(errmsg){
            response.status(404).json({ message: errmsg });
          }
          else{
            let result = await update__(oldData);
            if (result) response.status(200).json({ message: "Data Updated" });
            else response.status(400).json({ message: "Internal Server Error" });
          }

    ////////////////////////////////////////

  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
