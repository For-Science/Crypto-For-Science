import { Meteor } from "meteor/meteor"
import { Roles } from "meteor/alanning:roles"

// ***************************************************************
// Permissions
// ***************************************************************

// Checks whether selected user or current user can edit the project
export const canEditProject = (project_id, userId) => {
	userId = typeof userId === "undefined" ? Meteor.userId() : userId
  // return userId === item.userId
	// return userId === item.owner
	return Roles.userIsInRole(userId, ['researcher','administrator'], project_id)
}

export const canSubmitDonationClaim = (userId, project_id) => {
	// must be [ logged in ] and also [ not in an administrative role for this project ]
	return Meteor.user() && !Roles.userIsInRole(userId, 'researcher', project_id)
}

// Checks whether selected user or current user is admin (with the Roles package)
export const isAdmin = user => { // user defaults to current user if not passed
	user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator"])
}

export const canViewAnyProject = user => { // user defaults to current user if not passed
	user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator","approver","checker"])
}

// same as isAdmin, except being functionality-based (instead of role-based) like the rest of the permissions
export const canManageAllProjects = user => { // user defaults to current user if not passed
  user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator","approver"])
}

export const canApproveRejectProjects = user => { // user defaults to current user if not passed
  user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator","approver"]) // add other roles to array as they become implemented
}
