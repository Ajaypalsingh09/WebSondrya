import express from "express";
import Blog from "../models/Blog.js";
import Portfolio from "../models/Portfolio.js";
const router=express.Router();
router.get("/blogs", async(req,res)=>res.json(await Blog.find()));
router.get("/portfolio", async(req,res)=>res.json(await Portfolio.find()));
export default router;
