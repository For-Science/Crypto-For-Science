import { Mongo } from "meteor/mongo"

import ProjectsSchema from "./schemas/projects/projects-schema"

// ***************************************************************
// DOCUMENTS Collection
// ***************************************************************

export const Projects = new Mongo.Collection("projects")

// We use explicit methods, so deny everything
Projects.allow({
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

Projects.deny({
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
Projects.attachSchema(ProjectsSchema)
