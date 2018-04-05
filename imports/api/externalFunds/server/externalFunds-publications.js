import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import { ExternalFunds } from "../both/externalFunds-collection.js"

import * as permissions from "/imports/modules/permissions.js"

// EXTERNALFUNDS CAN MANAGE
// -------------------------------------------------------
Meteor.publish("externalFunds.canManage", function externalFundsCanManage(projectId) {
	if( permissions.canEditProject(projectId) ){
		return ExternalFunds.find({"projectId":projectId})
	}
})