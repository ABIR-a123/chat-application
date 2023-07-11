// ? external import

const express=require("express");
const router=express.Router();

// ? internal imports
const{getInbox}=require("../controller/inboxController");
// ? show inbox page
router.get("/",getInbox)
module.exports=router;
