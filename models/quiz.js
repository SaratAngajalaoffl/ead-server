const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
	title: {
		type: String,
		min: 4,
		max: 255,
		required: 'Quiz Title must be set!',
	},
	questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
	totalmarks: { type: Number, required: 'Total marks must be given' },
	start_time: { type: String, required: 'Start time must be Specified!' },
	end_time: { type: String, required: 'End time must be Specified!' },
});

const QuizModel = mongoose.model('Quiz', QuizSchema);

module.exports = QuizModel;
