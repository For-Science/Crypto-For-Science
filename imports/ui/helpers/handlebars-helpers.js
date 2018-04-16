import { Template } from "meteor/templating"
import { round } from "/imports/lib/functions.js"
import * as permissions from "/imports/modules/permissions.js"
import { FlowRouter } from "meteor/kadira:flow-router"

// ***************************************************************
// COMMON HELPERS (client-side only)
// ***************************************************************

import * as helpers from "/imports/modules/helpers.js"

// Cheap pluralization
Template.registerHelper("pluralize", (count, word) => {
  return helpers.pluralize(count, word)
})

// Outputs e.g. 12 days ago or 2 hours ago
Template.registerHelper("showTimeAgo", date => {
  return helpers.showTimeAgo(date)
})

// Outputs e.g. Jan, 2013
Template.registerHelper("showMonthYear", date => {
  return helpers.showMonthYear(date)
})

// Outputs e.g. 12th Jan, 2013
Template.registerHelper("showDayMonthYear", date => {
  return helpers.showDayMonthYear(date)
})

// Outputs August 30th 2014, 5:33:46 pm
Template.registerHelper("showPrettyTimestamp", date => {
  return helpers.showPrettyTimestamp(date)
})

// Get profile image or placeholder image
Template.registerHelper("getProfileImage", image => {
  return helpers.getProfileImage(image)
})

// Translates those bytes to something more readable (e.g. 1.2 MB)
Template.registerHelper("bytesToSize", bytes => {
  return helpers.bytesToSize(bytes)
})

// converts cents to dollar
Template.registerHelper("centiToDeci", centi => {

	// console.log("called round on " + centi);
	// console.log("rounded value:");
	// console.log(round((centi/100),2));

	// https://stackoverflow.com/a/2901298/1937233 adding commas
  // return (centi/100).toFixed(2) .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return round((centi/100),2).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")  // go back 2 decimal places, rounded to 2 decimal places.

})

Template.registerHelper("getPercent", (totalRaised, projectGoal) => {
	return (totalRaised/projectGoal)*100;
})



Template.registerHelper("canEditProject", (project_id) => {
	return permissions.canEditProject(project_id)
})

Template.registerHelper( "canSubmitDonationClaim", (project_id) => {
	return permissions.canSubmitDonationClaim(Meteor.userId(), project_id)
})

Template.registerHelper( "isAdmin", () => {
	return permissions.isAdmin(Meteor.userId())
})

Template.registerHelper( "canManageAllProjects", () => {
	return permissions.canManageAllProjects(Meteor.userId())
})

Template.registerHelper('isActiveRoute_Tab', function(routeName) {
	if (FlowRouter.getRouteName() == routeName) {
		// console.log(routeName + ' > Active');
		return "show active"
  }
	else {
		// console.log(routeName + ' > none');
		return ""
	}
});

Template.registerHelper( "daysRemaining", (endDate) => {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var today = new Date();

	today.setHours(0, 0, 0)
	endDate.setHours(0, 0, 0);

	var diffDays = Math.round(Math.abs((endDate.getTime() - today.getTime())/(oneDay)));
	return diffDays
})