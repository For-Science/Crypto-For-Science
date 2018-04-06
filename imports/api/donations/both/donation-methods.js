import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"

import { Donations } from "../both/donation-collection.js"
import DonationSchema from "./schemas/donation/donation-schema"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// METHODS (related to the donations (claims) collection)
// ***************************************************************

export const createDonation = new ValidatedMethod({
  name: "donations.create",
  validate: DonationSchema.validator(),
  run(donation) {
    // Additional data verification

		if(donation.userId != this.userId){
			throw new Meteor.Error('donations.create',
        `User can't submit a donation for a different user.`);
		}

    return Donations.insert(
      donation,
      function(error, result) {
        if (error) {
					// console.log(error);
          throw new Meteor.Error(500, "Server error")
        }
      }
    )
  }
})

export const approveDonation = new ValidatedMethod({
  name: "donation.approve",
  validate: DonationSchema.validator(),
  run(donation) {
    // Additional data verification

		// validate that they have the permissions needed to approve this donation claim
		if (!permissions.canEditProject(donation.projectId)) {
			throw new Meteor.Error('projects.create',
        "Does not have necessary permissions to edit project");
		}

		Donations.update(
			{_id : donation._id, projectId : donation.projectId},
			{
				$set: {
					reviewed: true,
					approved: true,
				}
	    },
	    function(error, result) {
	      if (error) {
	        throw new Meteor.Error(500, "Server error")
	      }
	    }
		);
	}
})

export const rejectDonation = new ValidatedMethod({
  name: "donation.reject",
  validate: DonationSchema.validator(),
  run(donation) {
    // Additional data verification

		// validate that they have the permissions needed to approve this donation claim
		const donationRead = Donations.findOne(donation._id);

		if (!permissions.canEditProject(donation.projectId)) {
			throw new Meteor.Error('projects.create',
        "Does not have necessary permissions to edit project");
		}

		Donations.update(
			{_id : donation._id, projectId : donation.projectId},
			{
				$set: {
					reviewed: true,
					approved: false,
				}
	    },
	    function(error, result) {
	      if (error) {
	        throw new Meteor.Error(500, "Server error")
	      }
	    }
		);
	}
})

// export const updateDocument = new ValidatedMethod({
//   name: "documents.update",
//   validate: UpdateDocumentSchema.validator(),
//   run(document) {
//     // Additional data verification
//
//     return Documents.update(
//       document._id,
//       {
//         $set: {
//           title: document.title,
//           content: document.content
//         }
//       },
//       function(error, result) {
//         if (error) {
//           throw new Meteor.Error(500, "Server error")
//         }
//       }
//     )
//   }
// })
//
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
