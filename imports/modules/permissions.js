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
	return Roles.userIsInRole(userId, 'researcher', project_id)
}

export const canSubmitDonationClaim = (userId, project_id) => {
	// must be [ logged in ] and also [ not in an administrative role for this project ]
	return Meteor.user() && !Roles.userIsInRole(userId, 'researcher', project_id)
}

// If the user owns the item, give permission. Might want to edit this as needed.
export const canRemoveItem = (userId, item) => {
  return userId === item.userId
}

// Checks whether selected user or current user is admin (with the Roles package)
export const isAdmin = user => {
	user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator"])
}

export const canManageAllProjects = user => {
  user = typeof user === "undefined" ? Meteor.user() : user
  return !!user && Roles.userIsInRole(user, ["administrator"])
}

