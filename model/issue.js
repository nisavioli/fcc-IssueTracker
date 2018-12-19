const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IssueSchema = new Schema(
	{
		title		: {type: String, required: true},
		text		: {type: String, required: true},
		createdBy	: {type: String, required: true},
		assignedTo	: String,
		open		: {type: Boolean, default: true},
		status		: String
	},
	{timestamps: {createdAt: 'createdOn', updatedAt: 'updatedOn'}}
);
const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;