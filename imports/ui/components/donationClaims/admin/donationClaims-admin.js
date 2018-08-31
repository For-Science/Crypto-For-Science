import { Template } from "meteor/templating"
import { Projects } from "/imports/api/projects/both/project-collection.js"
import { DonationClaims } from "/imports/api/donationClaims/both/donation-claim-collection.js"
import { Blaze } from 'meteor/blaze'

import DonationClaimSchema from "/imports/api/donationClaims/both/schemas/donationClaim/donation-claim-schema.js"

import { approveDonationClaim, rejectDonationClaim } from "/imports/api/donationClaims/both/donation-claim-methods.js"

import "./donationClaims-admin.jade"
// import "./donationClaims-admin-hooks.js"

Template.projectDonationClaimsAdmin.onCreated(function () {
	this.getProjectId = () => FlowRouter.getParam("projectId");

	this.autorun(() => {
		this.subscribe("donationClaims.canManage", this.getProjectId());
		this.subscribe("projects.single", { "id":this.getProjectId()} )
	})
})

Template.projectDonationClaimsAdmin.onRendered(function () { })

Template.projectDonationClaimsAdmin.onDestroyed(function () { })

Template.projectDonationClaimsAdmin.helpers({
	createDonationClaimSchema: function () {
		return DonationClaimSchema
	},
	projectId: function () {
		return Template.instance().getProjectId()
	},
	donationClaims: function () {
		return DonationClaims.find({}, { sort: { createdAt: -1 } })
	},
	project: function () {
		return Projects.findOne({ _id: Template.instance().getProjectId() }) || ""
	}
})

Template.projectDonationClaimsAdmin.events({
})

Template.donationClaimListItem.events({
	"click .approveDonationClaim": (event, templateInstance) => {
		let donationClaim = Blaze.getData(event.currentTarget);
		// console.log(donationClaim);
		approveDonationClaim.call(
			donationClaim,
			(err, res) => {
				if (err) {
					console.log(err);
				}
				console.log(res);
			}
		);

	},
	"click .rejectDonationClaim": (event, templateInstance) => {
		let donationClaim = Blaze.getData(event.currentTarget);
		// console.log(donation);
		rejectDonationClaim.call(
			donationClaim,
			(err, res) => {
				if (err) {
					console.log(err);
				}
				console.log(res);
			}
		);

	}
})
