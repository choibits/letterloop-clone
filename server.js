// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Question from "./models/question.js";

dotenv.config();

const app = express();

app.use(express.json()); // Use express.json() to parse JSON data from the frontend
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, Letterloop Backend is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


// CREATE AN API ROUTE TO SAVE A QUESTION
app.post("/questions", async (req, res) => {
    try {
        const { text, username } = req.body;
        const newQuestion = new Question({ text, username, answers: [] });
    
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: "Error saving question" });
    }
});

// FETCH AND DISPLAY QUESTIONS
app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});