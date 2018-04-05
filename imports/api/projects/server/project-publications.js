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

// PROJECTS PENDING
// -------------------------------------------------------
Meteor.publish("projects.pending", function projectsPending() {
	if( permissions.isAdmin() ){
		// console.log("this user is an admin");
  	return Projects.find({"bools.approved" : false})
	}
	else{
		// console.log("this user is not an admin");
		return
	}
})

// PROJECTS FEATURED
// -------------------------------------------------------
Meteor.publish("projects.featured", function projectsFeatured() {
  return Projects.find({"bools.approved" : true, "bools.outofTime" : false, "bools.isFeatured" : true})
})

// PROJECTS CAN MANAGE
// -------------------------------------------------------
Meteor.publish("projects.canManage", function projectsCanManage() {
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

  return Projects.find(id)
})
