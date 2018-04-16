import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import { Donations } from "../both/donation-collection.js"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// PUBLICATIONS (For the donations collection)
// ***************************************************************

// DONATIONS INDEX
// -------------------------------------------------------
Meteor.publish("donations.all", function donationsAll() {
	if( permissions.isAdmin() ){
	  return Donations.find()
	}
	else{
		return
	}
})

// DONATIONS CAN MANAGE
// -------------------------------------------------------
Meteor.publish("donations.canManage", function donationsCanManage(projectId) {
	if( permissions.canEditProject(projectId) ){
		return Donations.find({"projectId":projectId})
	}
})

// DONATIONS SHOW
// -------------------------------------------------------
Meteor.publish("donations.forProject", function donationsForProject(projectId) {
	return Donations.find({"projectId" : projectId, "reviewed" : true, "approved" : true })
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
