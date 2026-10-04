import express from "express";
import Contact from "../models/Contact.js";
const router=express.Router();
router.get("/messages", async(req,res)=>{
 const msgs=await Contact.find().sort({createdAt:-1});
 res.json({success:true,data:msgs});
});
export default router;
