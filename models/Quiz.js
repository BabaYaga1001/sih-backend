const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [String],
    correctAnswer: {type: Number, required: true}
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: String,
    grade: Number,
    questions: [questionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref:"User" }
});

module.exports = mongoose.model("Quiz", quizSchema);