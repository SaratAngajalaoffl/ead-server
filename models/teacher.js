const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Teacher should have a email!'],
		unique: true,
		min: [6, 'Size of name less than 6!'],
	},
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
