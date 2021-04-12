const express = require('express');
const bcrypt = require('bcrypt');
const InstituteModel = require('../models/institute');
const StudentModel = require('../models/student');

const Router = express.Router();

Router.get('/', async (req, res, next) => {
	const query = await InstituteModel.find({}).select(['-password', '-__v']);
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query);
});

Router.post('/', (req, res, next) => {
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

Router.post('/add-student', (req, res, next) => {
	const { email, id } = req.body;
	const doc = new StudentModel({ email });
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

	res.send(bcrypt.compareSync(password, query.password));
});

module.exports = Router;
