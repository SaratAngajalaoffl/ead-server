const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required',
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please fill a valid email address',
		],
	},
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
