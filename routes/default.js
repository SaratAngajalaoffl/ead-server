const express = require('express');

const Router = express.Router();

Router.get('/', (req, res, next) => {
	res.send('this is the default endpoint!');
});

module.exports = Router;
