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
});

const QuizModel = mongoose.model('Quiz', QuizSchema);

module.exports = QuizModel;
