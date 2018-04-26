import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"
import { Roles } from "meteor/alanning:roles"

import { SiteMeta } from "./siteMeta-collection.js"
import SiteMetaSchema from "./schemas/siteMeta/siteMeta-schema.js"

import * as permissions from "/imports/modules/permissions.js"


// ***************************************************************
// METHODS (related to the siteMeta collection)
// ***************************************************************

// the only method exposed to the client related to the siteMeta is the method to update the site meta data.
// the site meta is a single document, created by the server when the app is turned on.

export const updateSiteMeta = new ValidatedMethod({
  name: "siteMeta.update",
  // validate: UpdateDocumentSchema.validator(),
	validate: SiteMetaSchema.validator(),
  run(siteMeta) {
    // Additional data verification

		// this meteor user needs to be able to edit this siteMeta
		if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error('siteMeta.update',
        'Must be logged in to edit a siteMeta.');
    }
		if (!permissions.canEditSiteMeta()) {
			throw new Meteor.Error('siteMeta.update',
        "Does not have necessary permissions to edit site meta");
		}

		let siteMetaId = siteMeta._id;
		delete siteMeta['_id'];

    return SiteMeta.update(
      {"_id" : siteMetaId},
      {
        $set: siteMeta
      },
      function(error, result) {
        if (error) {
					console.log(error);
          throw new Meteor.Error(500, "Server error")
        }
      }
    )
  }
})
