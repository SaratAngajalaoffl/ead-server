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
	name: {
		type: String,
		min: 4,
		max: 255,
		required: 'Display Name must be set!',
	},
	courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
	institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
