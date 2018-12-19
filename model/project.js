const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Issue = require('./issue');
const IssueSchema = mongoose.model('Issue');

const ProjectSchema = new Schema({
	name	:	{type: String, required: true, unique: true},
	issues	:	[{type: Schema.Types.ObjectId, ref: 'Issue'}]
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;