const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { studentauth, checkAuth } = require('../utils/auth_functions');
const CourseModel = require('../models/course');
const QuizModel = require('../models/quiz');
const Router = express.Router();

Router.route('/').get(async (req, res, next) => {
	const data = await CourseModel.find({});

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(data);
});

Router.route('/:courseid/add-quiz').post(async (req, res, next) => {
	const { title, marks } = req.body;
	const quiz = new QuizModel({ title, totalmarks: marks });
	quiz.save();
	const data = await CourseModel.findOne({ _id: req.params.courseid });
	data.quizzes.push(quiz._id);
	data.save();

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(quiz);
});

module.exports = Router;
