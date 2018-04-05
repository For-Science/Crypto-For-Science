import { Template } from "meteor/templating"

import { Projects } from "/imports/api/projects/both/project-collection.js"

import "./settings.jade"

Template.settings_myProjects.onCreated(function() {
  this.subscribe("projects.canManage")
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
  this.subscribe("projects.pending")
})
Template.settings_admin.onRendered(function() {})
Template.settings_admin.onDestroyed(function() {})
Template.settings_admin.helpers ({
	projects() {
		return Projects.find({"bools.approved" : false}, { sort: { createdAt: -1 } })
	}
})
Template.settings_admin.events({})
