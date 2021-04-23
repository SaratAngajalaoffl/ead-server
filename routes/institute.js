const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkAuth } = require('../utils/auth_functions');
const InstituteModel = require('../models/institute');
const StudentModel = require('../models/student');
const TeacherModel = require('../models/teacher');
const CourseModel = require('../models/course');

const Router = express.Router();

Router.post('/register', (req, res, next) => {
	const { name, password } = req.body;

	const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));

	const doc = new InstituteModel({ name, password: hash });
	doc.save((err, newit) => {
		if (err) next(err);
		else {
			res.status(201);
			res.setHeader('Content-Type', 'application/json');
			res.send({
				_id: newit._id,
				name: newit.name,
				teachers: newit.teachers,
				students: newit.students,
				courses: newit.courses,
			});
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

Router.get('/', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.find({}).select(['-password', '-__v']);
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query);
});

Router.get('/students', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.findOne({ _id: req.user._id }).populate(
		'students'
	);

	if (!query.students || query.students.length === 0)
		res.status(404).send('No students found');

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query.students);
});

Router.post('/add-student', checkAuth, (req, res, next) => {
	if (!req.user) next(new Error('Not Authorised'));
	const { email, name } = req.body;
	const doc = new StudentModel({ email, name, institute: req.user._id });
	doc.save(async (err, newit) => {
		if (err) next(err);
		else {
			console.log('User is', req.user);
			const query = await InstituteModel.findOne({
				name: req.user.name,
			});
			query.students.push(newit._id);
			query.save((err) => {
				if (err) next(err);
				res.status(201);
				res.setHeader('Content-Type', 'application/json');
				res.send(newit);
			});
		}
	});
});

Router.get('/teachers', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.findOne({ _id: req.user._id }).populate(
		'teachers'
	);

	if (!query.teachers || query.teachers.length === 0)
		res.status(404).send('No teachers found');

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query.teachers);
});

Router.post('/add-teacher', checkAuth, (req, res, next) => {
	if (!req.user) res.status(401).send(new Error('Not Authorised'));
	const { email, name } = req.body;
	const doc = new TeacherModel({ email, name, institute: req.user._id });
	doc.save(async (err, newit) => {
		if (err) next(err);
		else {
			const query = await InstituteModel.findOne({
				name: req.user.name,
			});
			query.teachers.push(newit._id);
			query.save((err) => {
				if (err) next(err);
				res.status(201);
				res.setHeader('Content-Type', 'application/json');
				res.send(newit);
			});
		}
	});
});

Router.get('/courses', checkAuth, async (req, res, next) => {
	const query = await InstituteModel.findOne({ _id: req.user._id }).populate(
		'courses'
	);

	if (!query.courses || query.courses.length === 0)
		res.status(404).send('No courses found');

	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query.courses);
});

Router.post('/add-course', checkAuth, (req, res, next) => {
	if (!req.user) res.status(401).send(new Error('Not Authorised'));
	const { name } = req.body;
	const doc = new CourseModel({ name, institute: req.user._id });
	doc.save(async (err, newit) => {
		if (err) next(err);
		else {
			const query = await InstituteModel.findOne({
				name: req.user.name,
			});
			query.courses.push(newit._id);
			query.save((err) => {
				if (err) next(err);
				res.status(201);
				res.setHeader('Content-Type', 'application/json');
				res.send(newit);
			});
		}
	});
});

module.exports = Router;
