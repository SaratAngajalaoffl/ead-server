const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Institute should have a Name!'],
		unique: true,
		min: [6, 'Size of name less than 6!'],
	},
	password: {
		type: String,
		required: [true, 'Institute should have a passwords'],
	},
	teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const InstituteModel = mongoose.model('Institute', InstituteSchema);

module.exports = InstituteModel;
