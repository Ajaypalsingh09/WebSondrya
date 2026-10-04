import mongoose from "mongoose";
const schema=new mongoose.Schema({
 title:String,description:String,image:String,category:String,url:String
});
export default mongoose.model("Portfolio",schema);
