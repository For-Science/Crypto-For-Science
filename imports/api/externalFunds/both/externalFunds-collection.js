import { Mongo } from "meteor/mongo"

import ExternalFundsSchema from "./schemas/externalFunds/externalFunds-schema"

// ***************************************************************
// DONATIONS Collection
// ***************************************************************

export const ExternalFunds = new Mongo.Collection("externalFunds")

// We use explicit methods, so deny everything
ExternalFunds.allow({
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

ExternalFunds.deny({
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
ExternalFunds.attachSchema(ExternalFundsSchema)
