const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		min: 4,
		max: 255,
		required: 'Course Name must be set!',
	},
	institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
	teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;
