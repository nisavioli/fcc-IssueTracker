const Models = require("../model/db");
const { Issue, Project } = Models;

function findIssuesByProject(project, filter = {}) {
    return Project.findOne({ name: project.name })
    .populate({ path: "issues", match: filter })
    .then(proj => proj.issues, err => err);

    // .exec((err, p) => {return p.issues || err;});
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
 *
 */
async function createNewIssue(i, pName) {
    issue = new Issue(i);
    await issue.save();
    await Project.findOneAndUpdate({name: pName},{'$push': {issues: issue}}, {upsert: true}).exec();
    return issue;
}


function findAndUpdateIssue(id, params) {
  return Issue.findByIdAndUpdate(id, params);
}

function deleteIssueById(id) {
  return Issue.findByIdAndDelete(id).exec();
}

function deleteProjectByName(pName) {
  return Project.findOneAndDelete({ name: pName }).exec();
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
