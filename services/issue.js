const Models = require("../model/db");
const { Issue, Project } = Models;

function findIssuesByProject(projectName, filter = {}) {
  return Project.findOne({ name: projectName })
    .populate({ path: "issues", match: filter })
    .exec();
}

function findProject(projectName) {
  return Project.findOne({ name: projectName }).exec();
}

function createNewProject(pName) {
  project = new Project({ name: pName });
  return project.save();
}

/**
 *@param {Project} project
 */
async function createNewIssue(i, project) {
  issue = await new Issue(i).save();
  project.issues.push(issue);
  return project.save();
}

async function findAndUpdateIssue(id, params) {
  return Issue.findByIdAndUpdate(id, params);
}

function deleteIssueById(id) {
  return Issue.findByIdAndDelete(id).exec();
}

function deleteProjectByName(pName){
	return Project.findOneAndDelete({name: pName}).exec();
}

module.exports = {
  findIssuesByProject,
  findProject,
  createNewProject,
  createNewIssue,
  findAndUpdateIssue,
  deleteIssueById,
  deleteProjectByName
};
