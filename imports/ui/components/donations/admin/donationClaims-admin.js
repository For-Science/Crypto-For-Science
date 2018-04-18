import { Template } from "meteor/templating"
import { Projects } from "/imports/api/projects/both/project-collection.js"
import { Donations } from "/imports/api/donations/both/donation-collection.js"
import { Blaze } from 'meteor/blaze'

import DonationSchema from "/imports/api/donations/both/schemas/donation/donation-schema.js"

import { approveDonation, rejectDonation} from "/imports/api/donations/both/donation-methods.js"

import "./donationClaims-admin.jade"
// import "./donationClaims-admin-hooks.js"

Template.projectDonationClaimsAdmin.onCreated(function() {
	this.getProjectId = () => FlowRouter.getParam("projectId");

	this.autorun(() => {
    this.subscribe("donations.canManage", this.getProjectId());
		this.subscribe("projects.single", this.getProjectId())
  })
})

Template.projectDonationClaimsAdmin.onRendered(function() {})

Template.projectDonationClaimsAdmin.onDestroyed(function() {})

Template.projectDonationClaimsAdmin.helpers({
  createDonationSchema: function() {
    return DonationSchema
  },
	projectId: function(){
		return Template.instance().getProjectId()
	},
	donations: function () {
		return Donations.find({},{ sort: { createdAt: -1 } })
	},
	project: function(){
		return Projects.findOne({ _id: Template.instance().getProjectId() }) || ""
	}
})

Template.projectDonationClaimsAdmin.events({
})

Template.donationListItem.events({
	"click .approveDonation" : (event, templateInstance) =>{
		let donation = Blaze.getData(event.currentTarget);
		// console.log(donation);
		approveDonation.call(
			donation,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);

	},
	"click .rejectDonation" : (event, templateInstance) =>{
		let donation = Blaze.getData(event.currentTarget);
		// console.log(donation);
		rejectDonation.call(
			donation,
			(err, res) => {
			  if (err) {
					console.log(err);
			  }
				console.log(res);
			}
		);

	}
})
