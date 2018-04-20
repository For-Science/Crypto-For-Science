import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"
import { Roles } from "meteor/alanning:roles"
import { round } from "/imports/lib/functions.js"

import { ExternalFunds } from "../both/externalFunds-collection.js"
import ExternalFundsSchema from "./schemas/externalFunds/externalFunds-schema"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// METHODS (related to the externalFunds collection)
// ***************************************************************

export const addExternalFunding = new ValidatedMethod({
  name: "externalFunds.create",
  validate: ExternalFundsSchema.validator(),
  run(externalFund) {

		// some validation here to make sure user is adding funding into a
		// project that he manages
		if (!permissions.canEditProject(externalFund.projectId)) {
			throw new Meteor.Error('externalFunds.create',
        "Does not have necessary permissions to edit project");
		}

		externalFund.amount = round(round((externalFund.amount),2)*100) // get it into cents

    return ExternalFunds.insert(
      externalFund,
      function(error, result) {
        if (error) {
					// console.log(error);
          throw new Meteor.Error(500, "Server error")
        }
      }
    )
  }
})


export const removeExternalFunding = new ValidatedMethod({
	// code for deleting the external funding
	name: "externalFunds.remove",
  validate: ExternalFundsSchema.validator(),
  run(externalFund) {

		// some validation here to make sure user is removing funding from a
		// project that he manages
		if (!permissions.canEditProject(externalFund.projectId)) {
			throw new Meteor.Error('externalFunds.remove',
        "Does not have necessary permissions to edit project");
		}

    return ExternalFunds.remove(
      externalFund,
      function(error, result) {
        if (error) {
					// console.log(error);
          throw new Meteor.Error(500, "Server error")
        }
      }
    )
  }
})

// export const deleteDocument = new ValidatedMethod({
//   name: "documents.delete",
//   validate: new SimpleSchema({
//     documentId: { type: String }
//   }).validator(),
//   run({ documentId }) {
//     // Additional data verification
//
//     return Documents.remove(documentId, function(error, result) {
//       if (error) {
//         throw new Meteor.Error(500, "Server error")
//       }
//     })
//   }
// })
