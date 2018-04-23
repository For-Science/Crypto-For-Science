import { FlowRouter } from "meteor/kadira:flow-router";
import { Meteor } from "meteor/meteor";

import { notify } from "/imports/modules/notifier";

// ***************************************************************
// Route filters & triggers
// ***************************************************************

// Simple redirect unless user is logged in
const mustBeLoggedIn = (context, redirect, stop) => {
	if (!Meteor.userId()) {
		var route = FlowRouter.current();
		// console.log("FlowRouter.current():");
		// console.log(route);
		if (route.oldRoute && route.oldRoute.name != route.route.getRouteName()) {
			// console.log("going back via window history"); // because flowRouter.oldRoute doesn't include any param data
			window.history.back();
		} else {
			// console.log("going to front page");
			redirect("frontpage");
		}
		notify("Please log in or sign up first.", "error");
	}
};

/*
Uncomment to require the user to be logged in to visit these routes
Note: This is only handled client-side. Remember to do verification on the server as well
*/

FlowRouter.triggers.enter([mustBeLoggedIn], {
	except: [
		"frontpage",
		"projectsIndex",
		"projectShow",
		"login",
		"projectDonationClaimNew",
		"about",
		"contributors"
	]
});
// FlowRouter.triggers.enter([mustBeLoggedIn], { only: ['projectNew'] })
