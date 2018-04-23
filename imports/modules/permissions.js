import { Meteor } from "meteor/meteor"
import { Roles } from "meteor/alanning:roles"

// ***************************************************************
// Permissions
// ***************************************************************

// Checks whether selected user or current user can edit the project
export const canEditProject = (project_id) => {
	let userId = Meteor.userId();
  // return userId === item.userId
	// return userId === item.owner
	return Roles.userIsInRole(userId, ['researcher','administrator'], project_id)
}

export const canSubmitDonationClaim = ( project_id) => {
	// must be [ logged in ] and also [ not in an researcher role for this project ]
	let userId = Meteor.userId();
	return Meteor.user() && !Roles.userIsInRole(userId, 'researcher', project_id)
}

// Checks whether selected user or current user is admin (with the Roles package)
export const isAdmin = () => {
	let userId = Meteor.userId();
  Roles.userIsInRole(userId, ["administrator"])
}

export const canViewAnyProject = () => {
	let userId = Meteor.userId();
  Roles.userIsInRole(userId, ["administrator","approver","checker"])
}

export const canApproveRejectProjects = () => {
  let userId = Meteor.userId();
  Roles.userIsInRole(userId, ["administrator","approver"]) // add other roles to array as they become implemented
}

export const canFeatureProjects = () => {
  let userId = Meteor.userId();
  Roles.userIsInRole(userId, ["administrator"])
}
