import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import { SiteMeta } from "../both/siteMeta-collection.js"

// import * as permissions from "/imports/modules/permissions.js"

// SITE META PUBLICATION
// -------------------------------------------------------
Meteor.publish("siteMeta.metaDocument", function metaDocument() {
	return SiteMeta.find()
})