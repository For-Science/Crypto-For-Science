import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { Projects } from "/imports/api/projects/both/project-collection.js"
import ProjectsSchema from "/imports/api/projects/both/schemas/projects/projects-schema.js"
// import * as permissions from "/imports/modules/permissions.js"

import "./project-edit.jade"
import "./project-edit-hooks.js"

Template.projectEdit.onCreated(function() {
  this.getProjectId = () => FlowRouter.getParam("projectId")

  this.autorun(() => {
    this.subscribe("projects.single", {"id":this.getProjectId()})
  })
})

Template.projectEdit.onRendered(function() {})

Template.projectEdit.onDestroyed(function() {})

Template.projectEdit.helpers({
  updateProjectSchema: function() {
    return ProjectsSchema
  },
  project() {
    return Projects.findOne({ _id: Template.instance().getProjectId() }) || {}
  }
})

Template.projectEdit.events({})
