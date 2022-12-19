const { all__, single__, add__, update__,remove__} = require("./invesment.services");
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
    const {user_id,user_type,ammount,roi,nominee_id,account_no,is_send,referral_id}=request.body;

    if(!(user_id)||!(user_type)||!(ammount)||!(roi)||!(nominee_id)||!(account_no)||!(is_send)||!(referral_id))
    response.status(404).json({ message: "invalid data" });
  else {
    let data={user_id,user_type,ammount,roi,nominee_id,account_no,payment_id:null,agreement_file:null, status:1,is_send,referral_id}

    let result = await add__(data);
    if (!result)
      response.status(400).json({ message: "Internal Server Error" });
    else response.status(200).json({ ...data, id: result.insertId });

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
    if (newData.user_id != undefined && newData.user_id != oldData.user_id)
          oldData = { ...oldData, user_id: newData.user_id };

          if (newData.user_type != undefined && newData.user_type != oldData.user_type)
          oldData = { ...oldData, user_type: newData.user_type };

          if (newData.ammount != undefined && newData.ammount != oldData.ammount)
          oldData = { ...oldData, ammount: newData.ammount };

          if (newData.roi != undefined && newData.roi != oldData.roi)
          oldData = { ...oldData, roi: newData.roi };

          if (newData.nominee_id != undefined && newData.nominee_id != oldData.nominee_id)
          oldData = { ...oldData, nominee_id: newData.nominee_id };

          if (newData.account_no != undefined && newData.account_no != oldData.account_no)
          oldData = { ...oldData, account_no: newData.account_no };

          if (newData.payment_id != undefined && newData.payment_id != oldData.payment_id)
          oldData = { ...oldData, payment_id: newData.payment_id };

          if (newData.status != undefined && newData.status != oldData.status)
          oldData = { ...oldData, status: newData.status };

          if (newData.withdrw_req_time != undefined && newData.withdrw_req_time != oldData.withdrw_req_time)
          oldData = { ...oldData, withdrw_req_time: newData.withdrw_req_time };

          if (newData.is_send != undefined && newData.is_send != oldData.is_send)
          oldData = { ...oldData, is_send: newData.is_send };
         
          if(request.files && request.files.agreement_file)
          {
              if(!pdfValidation(request.files.agreement_file))
              response.status(406).json({ message: "Invalid File" });
              else{
                let fname=pdfUpload(request.files.agreement_file);
                oldData = { ...oldData, agreement_file: fname };
              }

          }

    ////////////////////////////////////////
    let result = await update__(oldData);
    if (result) 
    response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
