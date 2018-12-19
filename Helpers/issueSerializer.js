function serialize(i){
	return{
		_id: i._id,
		issue_title: i.title,
		issue_text: i.text,
		created_on: i.createdOn,
		updated_on: i.updatedOn,
		created_by: i.createdBy,
		assigned_to: i.assignedTo,
		open: i.open,
		status_text: i.status
	};
}

function deserialize(i){
	return{
		title: i.issue_title ,
		text: i.issue_text ,
		createdBy: i.created_by ,
		assignedTo: i.assigned_to ,
		open: i.open ,
		status: i.status_text
	};
}


module.exports = {serialize, deserialize};