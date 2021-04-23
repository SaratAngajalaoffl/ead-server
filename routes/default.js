const express = require('express');
const jwt = require('jsonwebtoken');
const { studentauth } = require('../utils/auth_functions');

const Router = express.Router();

Router.get('/', (req, res, next) => {
	res.send('this is the default endpoint!');
});

Router.post('/login', studentauth, (req, res, next) => {
	const user = {
		username: req.user.name,
		email: req.user.email,
	};

	var token = jwt.sign(user, process.env.JWTSECRET);

	res.json({
		token: token,
		...{
			name: req.user.name,
			email: req.user.email,
			courses: req.user.courses,
			institute: req.user.institute,
			type: req.user.type || 'teacher',
			_id: req.user._id,
		},
	});
});

module.exports = Router;
