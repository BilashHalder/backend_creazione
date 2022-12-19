const {all__,single__,add__,update__,remove__,isexist__,balanceupdate__} = require("./employee.services");
const { imageValidation, imageUpload } = require('../../util/others');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uid}=require('uid');
const {sendEmail,EmployeeNewAccount}=require('../../util/emails')

/**
 * Add New record in the table
 */

const Add__ = async (request, response) => {
    let { name,gender,email,phone } = request.body;
    if (name == undefined || gender == undefined || email == undefined || phone == undefined )
    response.status(404).json({ message: "Invalid Data" });
    else if (request.files == null)
    response.status(404).json({ message: invalidrequest });
  else if (request.files.image == undefined)
    response.status(404).json({ message: invalidrequest });
  else {
    let img = request.files.image;
    let obj = { name,gender,email,phone };

    let flag=await isexist__({email,phone});
    if(flag && flag.length)
    response.status(400).json({ message: "Email id /Phone no Already used" });
    else{
        obj.balance = 0;
        obj.pass = bcrypt.hashSync('123456', saltRounds);
        obj.status = 1;
        if (!imageValidation(img))
        response.status(400).json({ message: imageerror });
         else{
          let fu = await imageUpload(img);
          obj.image=fu;
          let result = await add__(obj);
          console.log(result)
          if (!result)
          response.status(400).json({ message: "Internal Server Error " });
          else
         {
          sendEmail(obj.email,"Your Employee Account Created",EmployeeNewAccount(obj))
          response.status(200).json({ ...obj, id: result.insertId });
         }
      }
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
console.log('new data',newData)
    ///////////////////**Compare & Update ///////////////////////
    if (newData.name != undefined && newData.name != oldData.name)
    oldData = { ...oldData, name: newData.name };

  if (newData.gender != undefined && newData.gender != oldData.gender)
    oldData = { ...oldData, gender: newData.gender }

  if (newData.email != undefined && newData.email != oldData.email)
    oldData = { ...oldData, email: newData.email }

    if (newData.commission_rate != undefined && newData.commission_rate != oldData.commission_rate)
    oldData = { ...oldData, commission_rate: newData.commission_rate }

    if (newData.employee_id != undefined && newData.employee_id != oldData.employee_id)
    oldData = { ...oldData, employee_id: newData.employee_id }

    if (newData.referral_key != undefined && newData.referral_key != oldData.referral_key)
    oldData = { ...oldData, referral_key: newData.referral_key }
    
  if (newData.phone != undefined && newData.phone != oldData.phone)
    oldData = { ...oldData, phone: newData.phone }

  if (newData.status != undefined && newData.status != oldData.status)
    oldData = { ...oldData, status: parseInt(newData.status) }


  if (newData.referral_key != undefined && newData.referral_key != oldData.referral_key)
    oldData = { ...oldData, referral_key: newData.referral_key }


    if (request.files && request.files.image) {
      let img = request.files.image;
      if (!imageValidation(img))
        errmsg = imageerror;
      let fu = await imageUpload(img);
      if (!fu)
        errmsg = servererror;
      else
        oldData = { ...oldData, image: fu }
    }


    ////////////////////////////////////////

    let result = await update__(oldData);
    if (result) response.status(200).json({ message: "Data Updated" });
    else response.status(400).json({ message: "Internal Server Error" });
  }
   else response.status(400).json({ message: "Data Not Found" });
};


const Users__ = async (request, response) => {
  const { user_id, user_type } = request.body;
  if (!user_id || !user_type)
    response.status(404).json({ message: "invalid data" });
  else {
    let data = await users__(request.body);
    if (!data)
      response.status(400).json({ message: "Internal Server Error" });
    else if (data.length == 0)
      response.status(404).json({ message: "No Data Found" });
    else response.json(data);
  }
};

/**send all the records form table */
const All__ = async (request, response) => {
    let alldata = await all__();
    if (!alldata) 
    response.status(400).json({ message: "Internal Server Error" });
    else if (alldata.length == 0)
      response.status(404).json({ message: "No Data Found" });
    else response.json(alldata);
  };
  
  
  /**send single record that matched by given pramas */
  const Single__ = async (request, response) => {
      if(isNaN(request.params.id))
      response.status(400).json({ message: "Invalid Data" });
      else{
          let data = await single__(request.params.id);
          if (!data)
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


module.exports = { All__, Single__, Add__, Update__, Remove__,Users__ };
