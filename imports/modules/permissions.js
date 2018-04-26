import { Meteor } from "meteor/meteor"
import { Roles } from "meteor/alanning:roles"

// ***************************************************************
// Permissions
// ***************************************************************

// Checks whether selected user or current user can edit the project
export const canEditProject = (project_id) => {
	let user = Meteor.userId();
  // return userId === item.userId
	// return userId === item.owner
	return Roles.userIsInRole(user, ['researcher','administrator'], project_id)
}

export const canSubmitDonationClaim = ( project_id) => {
	// must be [ logged in ] and also [ not in an researcher role for this project ]
	let user = Meteor.userId();
	return user && !Roles.userIsInRole(user, 'researcher', project_id)
}

// Checks whether selected user or current user is admin (with the Roles package)
export const isAdmin = () => {
	let user = Meteor.userId();
	return Roles.userIsInRole(user, ["administrator"])
}

export const canViewAnyProject = () => {
	let user = Meteor.userId();
  return Roles.userIsInRole(user, ["administrator","approver","checker"])
}

export const canApproveRejectProjects = () => {
  let user = Meteor.userId();
  return Roles.userIsInRole(user, ["administrator","approver"]) // add other roles to array as they become implemented
}

export const canFeatureProjects = () => {
  let user = Meteor.userId();
  return Roles.userIsInRole(user, ["administrator"])
}

export const canEditSiteMeta = () => {
  let user = Meteor.userId();
  return Roles.userIsInRole(user, ["administrator"])
}