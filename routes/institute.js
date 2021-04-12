const express = require('express');

const InstituteModel = require('../models/institute');
const Router = express.Router();

Router.get('/', async (req, res, next) => {
	const query = await InstituteModel.find({});
	res.status(200);
	res.setHeader('Content-Type', 'application/json');
	res.send(query);
});

Router.post('/', (req, res, next) => {
	const doc = new InstituteModel(req.body);
	doc.save((err, newit) => {
		if (err) next(err);
		else {
			res.status(201);
			res.setHeader('Content-Type', 'application/json');
			res.send(newit);
		}
	});
});

module.exports = Router;
