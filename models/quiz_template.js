const mongoose = require('mongoose');

const QuizTempSchema = new mongoose.Schema({
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz',
	},
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student',
	},
	responses: [
		{
			question: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Question',
			},
			response: [
				{
					type: String,
					required: true,
				},
			],
		},
	],
});

const QuizTempModel = mongoose.model('QuizTemplate', QuizTempSchema);

module.exports = QuizTempModel;
