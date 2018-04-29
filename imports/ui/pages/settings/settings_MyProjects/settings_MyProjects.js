import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Projects } from "/imports/api/projects/both/project-collection.js";
import { Images } from '/imports/fileTransfer/images/both/images-collection.js';

import "./settings_MyProjects.jade"
import "/imports/ui/components/fileTransfer/images/upload/images-upload.js"

Template.settings_myProjects.onCreated(function() {
  this.subscribe("projects.isResearcher");
});
Template.settings_myProjects.helpers ({
	projects() {
		let ids = Roles.getGroupsForUser(Meteor.userId(), 'researcher'); // returns an array of ids
		return Projects.find({ _id: {$in: ids}}, { sort: { createdAt: -1 } });
	}
});

Template.pendingReview.onCreated(function() {
	this.getProjectID = () => Template.currentData().project._id // should contain the project in this context or fail miserably
	console.log("t.pendingReview project id is");
	console.log(this.getProjectID());
	this.autorun(() => {
		this.subscribe("files.images.projectCover", this.getProjectID());
	})
});
Template.pendingReview.helpers ({
	imageFile() {
    return Images.findOne({"meta.projectId" : Template.instance().getProjectID(), "meta.type" : "projectPhoto"},{sort: {"meta.createdAt": -1}});
  }
});

Template.reviewed.onCreated(function() {
	this.getProjectID = () => Template.currentData().project._id // should contain the project in this context or fail miserably
	console.log("t.reviewed.onCreated project id is");
	console.log(this.getProjectID());
	this.autorun(() => {
		this.subscribe("files.images.projectCover", this.getProjectID());
	})
});
Template.reviewed.helpers ({
	imageFile() {
		console.log("t.reviewed.helpers project id is");
		console.log(Template.instance().getProjectID());
    return Images.findOne({"meta.projectId" : Template.instance().getProjectID(), "meta.type" : "projectPhoto"},{sort: {"meta.createdAt": -1}});
  }
});