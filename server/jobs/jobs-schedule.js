import { Jobs } from 'meteor/msavin:sjobs'

import { Projects } from "/imports/api/projects/both/project-collection.js"

Meteor.startup(() => {

	// TODO need to set it so that each time a project becomes active we add a job to it.
	// can query the jobs_data collection by arguments[0]._id to get the project_id of a job
	// so a meteor autorun on the "activeProjects" query that also checks if there are already jobs for each project before adding one
	// and a meteor autorun on an "inactiveprojects" query that removes any active jobs on those projects

	Jobs.clear(['success', 'cancelled', 'failure', 'pending']); // start fresh on restart

	// Meteor.setInterval(
		// function(){
			let activeProjects = Projects.find(
				{"bools.reviewed" : true, "bools.approved" : true},
				{fields: {_id:1, "cryptoAddresses":1}},
				{ sort: { createdAt: -1 } }
			).fetch();
			activeProjects.forEach(function(project,k){
				console.log("calling testJob for projectId " + project._id);
				Jobs.run("updateProjectTotals", project);
			});
		// },
		// 10000
	// )
})