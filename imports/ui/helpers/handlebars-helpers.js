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
	return permissions.canSubmitDonationClaim(project_id)
})

Template.registerHelper( "isAdmin", () => {
	return permissions.isAdmin()
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

Template.registerHelper('isActiveRoute_Multi', function(multiString) { // regexp for 'multi|string|locations'
	let routesArr = multiString.split("|")
	let isActive = "";
	routesArr.forEach( (val, key) => {
		if (FlowRouter.getRouteName() == val) {
			isActive = "active";
		}
	});
	return isActive;
});

Template.registerHelper( "daysRemaining", (endDate) => {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var today = new Date();

	today.setHours(0, 0, 0)
	endDate.setHours(0, 0, 0); // projects end at midnight in this time zone

	endTime = endDate.getTime();
	todayTime = today.getTime();

	if(todayTime > endTime){
		return "This campaign has ended"
	}
	else{ // TODO: improvement needed: if there is left than one day left, count down the HMS
		var diffDays = Math.round(Math.abs((endTime - todayTime)/(oneDay)));
		return helpers.pluralize(diffDays, "day") + " left"
	}
})

Template.registerHelper( "hasTimeRemaining", (endDate) => {
	var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	var today = new Date();

	today.setHours(0, 0, 0)
	endDate.setHours(0, 0, 0); // projects end at midnight in this time zone

	endTime = endDate.getTime();
	todayTime = today.getTime();

	if(todayTime > endTime){
		return false
	}
	else{
		return true
	}
})

// Template.registerHelper('breaklines', function(text, options) {
Template.registerHelper("breaklines", (text, options) => { https://stackoverflow.com/a/28746166/1937233
  // text = s.escapeHTML(text); // not installing underscore.string just for a single function so... https://stackoverflow.com/a/6234804/1937233
	text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

  text = text.replace(/(\r\n|\n|\r)/gm, '<br/>'); // newlines
  return new Spacebars.SafeString(text);
});