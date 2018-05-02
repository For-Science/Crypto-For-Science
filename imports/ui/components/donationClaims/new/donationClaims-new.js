import { Template } from "meteor/templating"
import { Projects } from "/imports/api/projects/both/project-collection.js"

import DonationClaimSchema from "/imports/api/donationClaims/both/schemas/donationClaim/donation-claim-schema.js"

import "./donationClaims-new.jade"
import "./donationClaims-new-hooks.js"

Template.projectDonationClaimNew.onCreated(function () {
	this.getProjectId = () => FlowRouter.getParam("projectId")

	this.autorun(() => {
		this.subscribe("projects.single", this.getProjectId())
	})
})

Template.projectDonationClaimNew.onRendered(function () { })

Template.projectDonationClaimNew.onDestroyed(function () { })

Template.projectDonationClaimNew.helpers({
	createDonationClaimSchema: function () {
		return DonationClaimSchema
	},
	projectId: function () {
		return Template.instance().getProjectId()
	},
	projectName: function () {
		return Projects.findOne({ _id: Template.instance().getProjectId() }).title
	},
	slug: function () {
		return Projects.findOne({ _id: Template.instance().getProjectId() }).slug
	},
})

Template.projectDonationClaimNew.events({})
