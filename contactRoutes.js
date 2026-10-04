import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  console.log("✅ Contact API Hit!");
  console.log("📩 Data Received:", req.body);

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });

  } catch (error) {
    console.log("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
