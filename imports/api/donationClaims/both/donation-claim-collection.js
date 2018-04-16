import { Mongo } from "meteor/mongo"

import DonationClaimSchema from "./schemas/donationClaim/donation-claim-schema"

// ***************************************************************
// DONATIONS Collection
// ***************************************************************

export const DonationClaims = new Mongo.Collection("donationClaims")

// We use explicit methods, so deny everything
DonationClaims.allow({
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

DonationClaims.deny({
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
DonationClaims.attachSchema(DonationClaimSchema)
