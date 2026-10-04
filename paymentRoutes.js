import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
const router=express.Router();

//const razorpay=new Razorpay({
// key_id:process.env.RAZORPAY_KEY_ID,
// key_secret:process.env.RAZORPAY_KEY_SECRET
//});

router.post("/create-order", async(req,res)=>{
 const order=await razorpay.orders.create({
  amount:req.body.amount*100,
  currency:"INR"
 });
 res.json(order);
});

router.post("/verify", (req,res)=>{
 const {order_id,payment_id,signature}=req.body;
 const body=order_id+"|"+payment_id;
 const expected=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
  .update(body).digest("hex");
 res.json({success: expected===signature});
});
export default router;
