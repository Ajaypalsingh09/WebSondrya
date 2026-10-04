import mongoose from "mongoose";
const schema=new mongoose.Schema({
 title:String,excerpt:String,content:String,date:String,image:String,category:String
});
export default mongoose.model("Blog",schema);
