const { all__, single__, add__, update__,remove__,} = require("./withdrawal.services");


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
  let {user_type,user_id,amount,account,ifsc_code,reference_id,status} =request.body;
  if (user_type==undefined || user_id==undefined || amount==undefined || account==undefined || ifsc_code==undefined)
    response.status(404).json({ message: "invalid data" });
  else {
    let temp={...request.body,reference_id:(reference_id==undefined?null:reference_id),status:(status==undefined?0:status)}
    let result = await add__(temp);
    if (!result)
      response.status(400).json({ message: "Internal Server Error" });
    else response.status(200).json({ ...request.body, id: result.insertId });
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
    if(newData.user_type!=undefined && newData.user_type!=oldData.user_type)
    oldData={...oldData,user_type:newData.user_type};

    if(newData.user_id!=undefined && newData.user_id!=oldData.user_id)
    oldData={...oldData,user_id:newData.user_id};

    if(newData.amount!=undefined && newData.amount!=oldData.amount)
    oldData={...oldData,amount:newData.amount};

    if(newData.account!=undefined && newData.account!=oldData.account)
    oldData={...oldData,account:newData.account};

    if(newData.ifsc_code!=undefined && newData.ifsc_code!=oldData.ifsc_code)
    oldData={...oldData,ifsc_code:newData.ifsc_code};

    if(newData.reference_id!=undefined && newData.reference_id!=oldData.reference_id)
    oldData={...oldData,reference_id:newData.reference_id};

    if(newData.status!=undefined && newData.status!=oldData.status)
    oldData={...oldData,status:newData.status};

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
