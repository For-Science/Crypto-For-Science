import { Mongo } from "meteor/mongo"

import DonationSchema from "./schemas/donation/donation-schema"

// ***************************************************************
// DONATIONS Collection
// ***************************************************************

export const Donations = new Mongo.Collection("donations")

// We use explicit methods, so deny everything
Donations.allow({
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

Donations.deny({
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
Donations.attachSchema(DonationSchema)
