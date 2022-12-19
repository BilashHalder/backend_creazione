const { all__, single__, add__, update__,remove__,isexist__} = require("./kyc.services");


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
    let {adhar_no,pan_no,address,user_id,user_type}=request.body;
    if(!(adhar_no)||!(pan_no)||!(address)||!(user_id)||!(user_type))
    response.status(404).json({ message: "invalid data" });
  else {
    let flag=await isexist__(request.body);
    if(!flag || flag.length==0){
        let temp={adhar_no,pan_no,address,user_id,user_type,adhar_verified:1,pan_verified:1}
        let result = await add__(temp);
        if (!result)
          response.status(400).json({ message: "Internal Server Error" });
        else 
        response.status(200).json({ ...request.body, id: result.insertId });
    }
   else{
    response.status(200).json(flag[0]);
   }
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

    if (newData.adhar_no != undefined && newData.adhar_no != oldData.adhar_no)
    oldData = { ...oldData, adhar_no: newData.adhar_no };

    if (newData.pan_no != undefined && newData.pan_no != oldData.pan_no)
    oldData = { ...oldData, pan_no: newData.pan_no };

    if (newData.address != undefined && newData.address != oldData.address)
    oldData = { ...oldData, address: newData.address };

    if (newData.pan_verified != undefined && newData.pan_verified != oldData.pan_verified)
    oldData = { ...oldData, pan_verified: newData.pan_verified };

    if (newData.adhar_verified != undefined && newData.adhar_verified != oldData.adhar_verified)
    oldData = { ...oldData, adhar_verified: newData.adhar_verified };

    if (newData.user_id != undefined && newData.user_id != oldData.user_id)
    oldData = { ...oldData, user_id: newData.user_id };

    if (newData.user_type != undefined && newData.user_type != oldData.user_type)
    oldData = { ...oldData, user_type: newData.user_type };

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
