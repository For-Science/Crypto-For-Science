import { Template } from "meteor/templating"

import { Projects } from "/imports/api/projects/both/project-collection.js"

// import { approveProject, rejectProject} from "/imports/api/projects/both/project-methods.js"
import * as projectMethods from "/imports/api/projects/both/project-methods.js"

import "./settings.jade"

Template.settings_myProjects.onCreated(function() {
  this.subscribe("projects.isResearcher")
})
Template.settings_myProjects.onRendered(function() {})
Template.settings_myProjects.onDestroyed(function() {})
Template.settings_myProjects.helpers ({
	projects() {
		let ids = Roles.getGroupsForUser(Meteor.userId(), 'researcher'); // returns an array of ids
		return Projects.find({ _id: {$in: ids}}, { sort: { createdAt: -1 } })
	}
})
Template.settings_myProjects.events({})

Template.settings_admin.onCreated(function() {
  this.subscribe("projects.admin")
})
Template.settings_admin.onRendered(function() {})
Template.settings_admin.onDestroyed(function() {})
Template.settings_admin.helpers ({
	projectsPending() {
		return Projects.find({"bools.reviewed" : false, "bools.approved" : false}, { sort: { createdAt: -1 } })
	},
	projectsActive() {
		return Projects.find({"bools.reviewed" : true, "bools.approved" : true}, { sort: { createdAt: -1 } })
	},
	projectsRejected() {
		return Projects.find({"bools.reviewed" : true, "bools.approved" : false}, { sort: { createdAt: -1 } })
	}
})
Template.settings_admin.events({})

Template.pendingCampaignListItem.events({
})

Template.approveProjectButton.events({
	"click .approveProject" : (event, templateInstance) =>{
		let project = Blaze.getData(event.currentTarget);
		console.log(project);
		projectMethods.approveProject.call(
			project,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);
	},
})

Template.rejectProjectButton.events({
	"click .rejectProject" : (event, templateInstance) =>{
		let project = Blaze.getData(event.currentTarget);
		console.log(project);
		projectMethods.rejectProject.call(
			project,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);
	}
})

Template.featureProjectButton.events({
	"click .featureProject" : (event, templateInstance) =>{
		let project = Blaze.getData(event.currentTarget);
		console.log(project);
		projectMethods.featureProject.call(
			project,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);
	}
})

Template.unfeatureProjectButton.events({
	"click .unfeatureProject" : (event, templateInstance) =>{
		let project = Blaze.getData(event.currentTarget);
		console.log(project);
		projectMethods.unfeatureProject.call(
			project,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);
	}
})

