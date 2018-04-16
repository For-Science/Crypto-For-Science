import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"

import { DonationClaims } from "../both/donation-claim-collection"
import DonationClaimSchema from "./schemas/donationClaim/donation-claim-schema"

import * as permissions from "/imports/modules/permissions.js"

// ***************************************************************
// METHODS (related to the donations (claims) collection)
// ***************************************************************

export const createDonationClaim = new ValidatedMethod({
	name: "donationClaims.create",
	validate: DonationClaimSchema.validator(),
	run(donationClaim) {
		// Additional data verification

		if (donationClaim.userId != this.userId) {
			throw new Meteor.Error('donationsClaims.create',
				`User can't submit a donation claim for a different user.`);
		}

		return DonationClaims.insert(
			donationClaim,
			function (error, result) {
				if (error) {
					// console.log(error);
					throw new Meteor.Error(500, "Server error")
				}
			}
		)
	}
})

export const approveDonationClaim = new ValidatedMethod({
	name: "donation-claim.approve",
	validate: DonationClaimSchema.validator(),
	run(donationClaim) {
		// Additional data verification

		// validate that they have the permissions needed to approve this donation claim
		if (!permissions.canEditProject(donationClaim.projectId)) {
			throw new Meteor.Error('projects.create',
				"Does not have necessary permissions to edit project");
		}

		DonationClaims.update(
			{ _id: donationClaim._id, projectId: donationClaim.projectId },
			{
				$set: {
					reviewed: true,
					approved: true,
				}
			},
			function (error, result) {
				if (error) {
					throw new Meteor.Error(500, "Server error")
				}
			}
		);
	}
})

export const rejectDonationClaim = new ValidatedMethod({
	name: "donationClaim.reject",
	validate: DonationClaimSchema.validator(),
	run(donationClaim) {
		// Additional data verification

		// validate that they have the permissions needed to approve this donation claim
		const donationClaimRead = DonationClaims.findOne(donation._id);

		if (!permissions.canEditProject(donationClaims.projectId)) {
			throw new Meteor.Error('projects.create',
				"Does not have necessary permissions to edit project");
		}

		DonationClaims.update(
			{ _id: donationClaims._id, projectId: donationClaims.projectId },
			{
				$set: {
					reviewed: true,
					approved: false,
				}
			},
			function (error, result) {
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
