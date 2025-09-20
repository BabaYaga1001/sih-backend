const express = require("express");
const router = express.Router();
const { createQuiz, getQuizzes, submitQuizzes } = require("../controllers/quizController");
const auth = require("../middlewares/authMiddlewares");

router.post("/create", auth, createQuiz);
router.get("/", auth, getQuizzes);
router.post("/submit", auth, submitQuizzes);

module.exports = router;


