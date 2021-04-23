const express = require('express');
const jwt = require('jsonwebtoken');

const { studentauth } = require('../utils/auth_functions');

const StudentRouter = express.Router();

module.exports = StudentRouter;
