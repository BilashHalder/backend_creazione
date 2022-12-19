const { all__, single__, add__, update__,remove__,} = require("./leave.services");


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
    let {annual, casual, sick, bereavement,maternity, others}=request.body;
    console.log(request.body)

    if(annual==undefined || casual==undefined || sick==undefined || bereavement==undefined || others==undefined||maternity==undefined)
    response.status(404).json({ message: "invalid data" });
  else {
    let result = await add__(request.body);
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

    if(newData.annual!=undefined && newData.annual!=oldData.annual)
    oldData={...oldData,annual:newData.annual};

    if(newData.casual!=undefined && newData.casual!=oldData.casual)
    oldData={...oldData,casual:newData.casual};


    if(newData.sick!=undefined && newData.sick!=oldData.sick)
    oldData={...oldData,sick:newData.sick};


    if(newData.bereavement!=undefined && newData.bereavement!=oldData.bereavement)
    oldData={...oldData,bereavement:newData.bereavement};

    if(newData.others!=undefined && newData.others!=oldData.others)
    oldData={...oldData,others:newData.others};

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
