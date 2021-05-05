const express = require('express');
const QuestionModel = require('../models/question');
const QuizModel = require('../models/quiz');
const Router = express.Router();

Router.route('/').get(async (req, res, next) => {
	const data = await QuizModel.find({});
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
});

Router.route('/:quizid/add-question').post(async (req, res, next) => {
	const { question, options } = req.body;
	const quiz = new QuestionModel({ question, options });
	quiz.save();
	const data = await QuizModel.findOne({ _id: req.params.quizid });
	data.questions.push(quiz._id);
	data.save();

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(quiz);
});

module.exports = Router;
