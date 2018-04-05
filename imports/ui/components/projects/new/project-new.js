import { Template } from "meteor/templating"

import ProjectsSchema from "/imports/api/projects/both/schemas/projects/projects-schema.js"

import "./project-new.jade"
import "./project-new-hooks.js"

Template.projectNew.onCreated(function() {})

Template.projectNew.onRendered(function() {})

Template.projectNew.onDestroyed(function() {})

Template.projectNew.helpers({
  createProjectSchema: function() {
    // return createProjectSchema
		return ProjectsSchema
  }
})

Template.projectNew.events({})
