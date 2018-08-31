import { Template } from "meteor/templating"
import { Projects } from "/imports/api/projects/both/project-collection.js"
import { ExternalFunds } from "/imports/api/externalFunds/both/externalFunds-collection.js"
import { Blaze } from 'meteor/blaze'

import ExternalFundsSchema from "/imports/api/externalFunds/both/schemas/externalFunds/externalFunds-schema.js"

import { addExternalFunding, removeExternalFunding } from "/imports/api/externalFunds/both/externalFunds-methods.js"

import "./externalFunds-admin.jade"

// projectExternalFundsAdmin
Template.projectExternalFundsAdmin.onCreated(function () {
	this.getProjectId = () => FlowRouter.getParam("projectId");

	this.autorun(() => {
		this.subscribe("externalFunds.canManage", this.getProjectId());
		this.subscribe("projects.single", {"id":this.getProjectId()})
	})
})

Template.projectExternalFundsAdmin.onRendered(function () { })

Template.projectExternalFundsAdmin.onDestroyed(function () { })

Template.projectExternalFundsAdmin.helpers({
	createExternalFundsSchema: function () {
		return ExternalFundsSchema
	},
	projectId: function () {
		return Template.instance().getProjectId()
	},
	externalFunds: function () {
		return ExternalFunds.find({}, { sort: { createdAt: -1 } })
	},
	project: function () {
		return Projects.findOne({ _id: Template.instance().getProjectId() }) || ""
	}
})

Template.projectExternalFundsAdmin.events({
})

Template.externalFundListItem.events({
	"click .removeFunding": (event, templateInstance) => {
		let externalFundItem = Blaze.getData(event.currentTarget);
		// console.log(donationClaim);
		removeExternalFunding.call(
			externalFundItem,
			(err, res) => {
				if (err) {
					console.log(err);
				}
				console.log(res);
			}
		);
	}
})
