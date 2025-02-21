const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings for multiple choices
    required: true,
  },
  correctAnswer: {
    type: Number, // Index of the correct answer in the options array
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
