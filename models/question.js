import mongoose from "mongoose";

//define the Schema
const questionSchema = new mongoose.Schema({
    text: { type: String, required: true }, // The actual question
    username: { type: String, required: true }, // Who asked the question
    answers: [
    {
      username: { type: String, required: true }, // Who answered
      text: { type: String, required: true }, // The answer text
      comments: [
        {
          username: { type: String, required: true }, // Who commented
          text: { type: String, required: true } // The comment text
        }
      ]
    }
  ]
});
  
const Question = mongoose.model("Question", questionSchema);
export default Question;
  