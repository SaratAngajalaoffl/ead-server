const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
	question: {
		type: String,
		min: 10,
		required: 'Quiz Title must be set!',
	},
	options: [{ type: String }],
	correct_options: { type: String },
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
