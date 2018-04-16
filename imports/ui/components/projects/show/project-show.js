import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"

import { Projects } from "/imports/api/projects/both/project-collection.js"
import { Donations } from "/imports/api/donations/both/donation-collection.js"

import "./project-show.jade"

Template.projectShow.onCreated(function() {
  this.getProjectID = () => FlowRouter.getParam("projectId")

  this.autorun(() => {
		this.subscribe("donations.forProject", this.getProjectID());
    this.subscribe("projects.single", this.getProjectID());
		// this.subscribe("donations.forProject", this.getProjectID());
  })
})

Template.projectShow.onRendered(function() {})

Template.projectShow.onDestroyed(function() {})

Template.projectShow.helpers({
  project() {
		return Projects.findOne({ _id: Template.instance().getProjectID() }) || false
  },
	donations() {
		return Donations.find({},{ sort: { createdAt: -1 } })
	},
})

Template.projectShow.events({})
