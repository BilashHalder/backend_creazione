const { all__, single__, add__, update__,remove__,isexist__} = require("./deposit.services");
const { imageValidation, imageUpload } = require('../../util/others');

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
    const{mode, doc, reference, amount, user_id, user_type}=request.body;

    if(mode==undefined|| reference==undefined ||amount==undefined || user_id==undefined || user_type==undefined )
    response.status(400).json({ message: "Invalid Data" });
  else {
    let data={mode, reference,user_type,user_id,amount,status:0}
   let flag=await isexist__(reference);
   if(!flag || flag.length==0){
    if(request.files && request.files.doc){
      let fu = imageUpload(request.files.doc);
      data.doc=fu;
    }
    else 
    data.doc="";
    let result = await add__(data);
    if (!result)
      response.status(400).json({ message: "Internal Server Error" });
    else response.status(200).json({ ...data, id: result.insertId });
   }
   else{
    response.status(400).json({ message: "Transaction Already Used" });
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
    if(newData.user_id!=undefined && newData.user_id!=oldData.user_id)
    oldData={...oldData,user_id:newData.user_id};

    if(newData.user_type!=undefined && newData.user_type!=oldData.user_type)
    oldData={...oldData,user_type:newData.user_type};

    if(newData.remarks!=undefined && newData.remarks!=oldData.remarks)
    oldData={...oldData,remarks:newData.remarks};

    if(newData.amount!=undefined && newData.amount!=oldData.amount)
    oldData={...oldData,amount:newData.amount};

    if(newData.status!=undefined && newData.status!=oldData.status)
    oldData={...oldData,status:newData.status};
    

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
