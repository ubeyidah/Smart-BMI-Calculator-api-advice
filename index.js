import express from "express";
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/advice", async (req, res) => {
  try {
    const { age, weight, height, gender, bmi } = req.body;
    if (!age || !weight || !height || !gender || !bmi)
      return res.status(400).json("Bad Request");

    const apiKey = process.env.API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Could you educate me on the general principles of BMI, fitness, and healthy eating habits that apply to a user profile with BMI: ${bmi}, Age: ${age}, Gender: ${gender}? Please focus on commonly accepted health standards. `;

    const result = await model.generateContent(prompt);
    return res.status(200).json(result.response.text());
  } catch (error) {
    console.log(error);

    return res.status(500).json("internal server error");
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server start on ", port);
});
