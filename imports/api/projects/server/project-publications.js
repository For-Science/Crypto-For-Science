import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import { Projects } from "../both/project-collection.js"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// PUBLICATIONS (For the documents collection)
// ***************************************************************

// PROJECTS INDEX
// -------------------------------------------------------
Meteor.publish("projects.all", function projectsAll() {
  return Projects.find({"bools.approved" : true, "bools.outofTime" : false})
})

// PROJECTS ADMIN LIVE
// -------------------------------------------------------
Meteor.publish("projects.admin", function projectsAll() {
	if( !permissions.canApproveRejectProjects() ) {
		// can't approve or reject projects (so, not an admin, checker, etc).
		// so can't see this publication.
		return
	}

  return Projects.find()
})

// PROJECTS PENDING
// -------------------------------------------------------
Meteor.publish("projects.pending", function projectsPending() {

	if( !permissions.canApproveRejectProjects() ) {
		// can't approve or reject projects (so, not an admin, checker, etc).
		// so can't see this publication.
		return
	}

  return Projects.find({"bools.approved" : false})

})

// PROJECTS FEATURED
// -------------------------------------------------------
Meteor.publish("projects.featured", function projectsFeatured() {
  return Projects.find({"bools.approved" : true, "bools.outofTime" : false, "bools.isFeatured" : true})
})

// PROJECTS CAN MANAGE
// -------------------------------------------------------
Meteor.publish("projects.isResearcher", function projectsCanManage() {
	// return projects that user can manage
	let ids = Roles.getGroupsForUser(Meteor.userId(), 'researcher'); // returns an array of ids where user is researcher

	// let obj_ids = ids.map(function(id) { return ObjectId(id); });
	// let obj_ids = ids.map(function(id) { return Meteor.Collection.ObjectID(id); });
	// return Projects.find({ _id: {$in: obj_ids}, "bools.approved" : true, "bools.outofTime" : false})

	// return Projects.find({ _id: {$in: ids}, "bools.approved" : true, "bools.outofTime" : false})
	return Projects.find({ _id: {$in: ids}})
		// ^ just quering plain IDs as strings. could be faster with objectIds. but as you can see, I'm doing something wrong.
})

// PROJECT SHOW
// -------------------------------------------------------
Meteor.publish("projects.single", function projectsSingle(id) {
  new SimpleSchema({
    id: { type: String }
  }).validate({ id })

	if( permissions.canViewAnyProject() ) {
		// staff can see a project even if it's not published
		return Projects.find(id)
	}
	else{
		// otherwise the project needs to be published
		return Projects.find({_id : id, "bools.approved" : true})
	}
})
