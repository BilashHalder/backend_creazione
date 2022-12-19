const { all__, single__, add__, update__,remove__,} = require("./request.services");


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
    let {name, subject, message, email,phone, request_type }=request.body;
    if(!(name)||!(phone)||!(subject)||!(message) || !email || !request_type)
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

    if(newData.name!=undefined && newData.name!=oldData.name)
        oldData={...oldData,name:newData.name};

        if(newData.phone!=undefined && newData.phone!=oldData.phone)
        oldData={...oldData,phone:newData.phone};

        if(newData.email!=undefined && newData.email!=oldData.email)
        oldData={...oldData,email:newData.email};

        if(newData.subject!=undefined && newData.subject!=oldData.subject)
        oldData={...oldData,subject:newData.subject};


        if(newData.message!=undefined && newData.message!=oldData.message)
        oldData={...oldData,message:newData.message};

        if(newData.status!=undefined && newData.status!=oldData.status)
        oldData={...oldData,status:newData.status};

        if(newData.request_type!=undefined && newData.request_type!=oldData.request_type)
        oldData={...oldData,request_type:newData.request_type};

        if(newData.remarks!=undefined && newData.remarks!=oldData.remarks)
        oldData={...oldData,remarks:newData.remarks};

    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  } else response.status(400).json({ message: "Data Not Found" });
};






module.exports = { All__, Single__, Add__, Update__, Remove__ };
