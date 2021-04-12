const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Student email should have a email!'],
		unique: true,
		min: [6, 'Size of name less than 6!'],
	},
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
