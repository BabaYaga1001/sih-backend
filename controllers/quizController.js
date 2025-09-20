const Quiz = require("../models/Quiz");
const Progress = require("../models/Progress");

exports.createQuiz = async (req, res) => {
    try{
        if(req.user.role !== "teacher"){
            return res.status(403).json({msg: "Only teachers can create quizzes"});
        }
        const {title,subject,grade,questions} = req.body;
        const quiz = await Quiz.create({
            title, subject, grade, questions, createdBy: req.user.id
        });
        res.json(quiz);
    }
    catch(err){
       res.status(500).json({error : err.message}); 
    }
};

exports.getQuizzes = async (req, res) => {
    try{
        const{subject, grade} = req.query;
        const filter = {};
        if(subject) filter.subject = subject;
        if(grade) filter.grade = grade;

        const quizzes = await Quiz.find(filter);
        res.json(quizzes);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.submitQuiz = async (req,res) => {
    try{
        const {quizId, answers} = req.body;
        const quiz = await Quiz.findById(quizId);
        if(!quiz) return res.status(404).json({msg: "Quiz not found"});

        let score = 0;
        quiz.questions.forEach((q,i) => {
            if(answers[i] === q.correctAnswer) score++;
        });
        await Progress.findOneAndUpdate(
            { student: req.user.id },
            { $push: { quizzesTaken: { quiz: quizId, score}}},
            { upsert: true }
        );
        res.json ({ total: quiz.questions.length, score });
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
};