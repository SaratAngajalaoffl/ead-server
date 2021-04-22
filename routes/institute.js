const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkAuth } = require('../utils/auth_functions');
const InstituteModel = require('../models/institute');
const StudentModel = require('../models/student');

const Router = express.Router();

Router.get('/', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.find({}).select(['-password', '-__v']);
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query);
});

// Router.post('/test', checkAuth, (req, res, next) => {
// 	if (!req.user) res.status(401).send(new Error('Not Authorised'));
// 	res.status(200).send({ user: req.user });
// });

Router.get('/students', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.findOne({ _id: req.user._id }).populate(
		'students'
	);

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query.students);
});

Router.post('/add-student', checkAuth, (req, res, next) => {
	if (!req.user) res.status(401).send(new Error('Not Authorised'));
	const { email } = req.body;
	const doc = new StudentModel({ email });
	doc.save(async (err, newit) => {
		if (err) next(err);
		else {
			console.log('User is', req.user);
			const query = await InstituteModel.findOne({
				name: req.user.name,
			});
			query.students.push(newit._id);
			query.save((err) => {
				res.status(201);
				res.setHeader('Content-Type', 'application/json');
				res.send(newit);
			});
		}
	});
});

Router.post('/register', (req, res, next) => {
	const { name, password } = req.body;

	const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

	const doc = new InstituteModel({ name, password: hash });
	doc.save((err, newit) => {
		if (err) next(err);
		else {
			res.status(201);
			res.setHeader('Content-Type', 'application/json');
			res.send(newit);
		}
	});
});

Router.post('/login', async (req, res, next) => {
	const { name, password } = req.body;
	const query = await InstituteModel.findOne({ name });

	if (bcrypt.compareSync(password, query.password)) {
		const user = {
			username: query.name,
			teachers: query.teachers,
			students: query.students,
			courses: query.courses,
		};

		var token = jwt.sign(user, process.env.JWTSECRET);

		res.status(200)
			.setHeader('Content-Type', 'application/json')
			.send({ token });
	}
});

module.exports = Router;
