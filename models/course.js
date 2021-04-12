const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Institute should have a Name!'],
		unique: true,
		min: [6, 'Size of name less than 6!'],
	},
});

const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;
