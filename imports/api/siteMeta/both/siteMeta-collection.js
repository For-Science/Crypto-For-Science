import { Mongo } from "meteor/mongo"

import SiteMetaSchema from "./schemas/siteMeta/siteMeta-schema.js"

// ***************************************************************
// SITE META Collection
// ***************************************************************

export const SiteMeta = new Mongo.Collection("siteMeta")

// We use explicit methods, so deny everything
SiteMeta.allow({
  insert() {
    return false
  },
  update() {
    return false
  },
  remove() {
    return false
  }
})

SiteMeta.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  }
})

// Must remember to attach the schema to the collection
SiteMeta.attachSchema(SiteMetaSchema)
