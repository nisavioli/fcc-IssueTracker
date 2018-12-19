const Models = require("../model/db");
const { Issue, Project } = Models;

const issueSerializer = require("../helpers/issueSerializer");
const { serialize, deserialize } = issueSerializer;

const services = require("../services");
const {
  findIssuesByProject,
  findProject,
  createNewProject,
  createNewIssue,
  findAndUpdateIssue,
  deleteIssueById,
  deleteProjectByName
} = services.issue;

async function getIssues(req, res, next) {
  let filter = qsToFilter(req.query);
  const pName = req.params.project;
  let project = await findIssuesByProject(pName, filter);
  let response = project.issues.map(issue => serialize(issue));
  return response;
}

async function createIssue(pName, issue) {
  let project = await findProject(pName);
  if (!project) {
    project = await createNewProject(pName);
  }
  let i = deserialize(issue);
  return serialize(await createNewIssue(i, project));
}

async function updateIssue(pName, params){
	let id = params._id;
	if(!id){return 'could not update' + id;}
	let changes = qsToFilter(params);
	if(!changes) { return 'no updated field sent';}
	try{
		await findAndUpdateIssue(id, params);
	} catch(err) {
		return 'could not update ' + id;
	}
	return 'successfully updated';
}

async function deleteIssue(pName, id){
	if(!id) {return '_id error';}
	try{
		await deleteIssueById(id, pName);
	} catch (err){
		console.log(err);
		return 'could not delete ' + id;
	}
	let project = await findIssuesByProject(pName);
	if (project.issues.length == 0){ await deleteProjectByName(pName); }
	return 'deleted ' + id;

}

module.exports = { getIssues, createIssue, updateIssue, deleteIssue };

// I know this is ugly but its getting late
function qsToFilter(qs) {
  let filter = {};
  if (typeof qs._id !== "undefined") filter._id = qs._id;
  if (typeof qs.issue_title !== "undefined") filter.title = qs.issue_title;
  if (typeof qs.created_on !== "undefined") filter.createdOn = qs.created_on;
  if (typeof qs.updated_on !== "undefined") filter.updatedOn = qs.updated_on;
  if (typeof qs.created_by !== "undefined") filter.createdBy = qs.created_by;
  if (typeof qs.assigned_to !== "undefined") filter.assignedTo = qs.assigned_to;
  if (typeof qs.open !== "undefined") filter.open = qs.open;
  if (typeof qs.status_text !== "undefined") filter.status = qs.status_text;
  if (typeof qs.issue_text !== "undefined") filter.text = qs.issue_text;
  return filter;
}
