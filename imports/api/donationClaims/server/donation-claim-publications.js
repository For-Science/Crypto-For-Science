import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import { DonationClaims } from "../both/donation-claim-collection.js"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// PUBLICATIONS (For the donation claims collection)
// ***************************************************************

// DONATIONS_CLAIMS INDEX
// -------------------------------------------------------
Meteor.publish("donationClaims.all", function donationClaimsAll() {
	if (permissions.isAdmin()) {
		return DonationClaims.find()
	}
	else {
		return
	}
})

// DONATION CLAIMS CAN MANAGE
// -------------------------------------------------------
Meteor.publish("donationClaims.canManage", function donationClaimsCanManage(projectId) {
	if (permissions.canEditProject(projectId)) {
		return DonationClaims.find({ "projectId": projectId })
	}
})

// DONATION CLAIMS SHOW
// -------------------------------------------------------
Meteor.publish("donationClaims.forProject", function donationClaimsForProject( {slug,projectId} ) {
	if(!!projectId){
		return DonationClaims.find({ "projectId": projectId, "reviewed": true, "approved": true })
	}
	return DonationClaims.find({ "slug": slug, "reviewed": true, "approved": true })
})


// // DONATIONS SHOW
// // -------------------------------------------------------
// Meteor.publish("donations.single", function donationsSingle(id) {
//   new SimpleSchema({
//     id: { type: String }
//   }).validate({ id })
//
//   return Donations.find(id)
// })
// // ^ disabled because there's no use for this right now. Plus it can retrieve
// // private data and there's no permissions check on it.
