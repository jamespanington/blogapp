import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	userId: {
		type: String,
		required: 'User ID is required'
	},
	comment: {
		type: String,
		required: 'Please enter your username'
	},
	articleId: {
		type: String,
		required: 'Please enter your password'
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Comment = (module.exports = mongoose.model('Comment', CommentSchema));