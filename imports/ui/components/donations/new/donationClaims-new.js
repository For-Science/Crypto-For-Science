import { Template } from "meteor/templating"
import { Projects } from "/imports/api/projects/both/project-collection.js"

import DonationSchema from "/imports/api/donations/both/schemas/donation/donation-schema.js"

import "./donationClaims-new.jade"
import "./donationClaims-new-hooks.js"

Template.projectDonationNew.onCreated(function() {
	this.getProjectId = () => FlowRouter.getParam("projectId")

	this.autorun(() => {
    this.subscribe("projects.single", this.getProjectId())
  })
})

Template.projectDonationNew.onRendered(function() {})

Template.projectDonationNew.onDestroyed(function() {})

Template.projectDonationNew.helpers({
  createDonationSchema: function() {
    return DonationSchema
  },
	projectId: function(){
		return Template.instance().getProjectId()
	},
	projectName: function(){
		return Projects.findOne({ _id: Template.instance().getProjectId() }).title
	}
})

Template.projectDonationNew.events({})
