const router=require("express").Router();
const { All__, Single__, Add__, Update__, Remove__}=require('./invesment.controller');
router.get("/:id",Single__);
router.get("/",All__);
router.post("/",Add__);
router.put("/:id",Update__);
router.delete("/:id",Remove__);

 /*To handle all invalid request */  
 router.all("*",(request,response)=>{
        response.status(500).json({ status:"failed", message:"invalid request" }); 
       });  

module.exports=router;