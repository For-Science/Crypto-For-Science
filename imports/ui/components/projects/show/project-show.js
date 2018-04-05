import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"

import { Projects } from "/imports/api/projects/both/project-collection.js"

import "./project-show.jade"

Template.projectShow.onCreated(function() {
  this.getProjectID = () => FlowRouter.getParam("projectId")

  this.autorun(() => {
    this.subscribe("projects.single", this.getProjectID())
  })
})

Template.projectShow.onRendered(function() {})

Template.projectShow.onDestroyed(function() {})

Template.projectShow.helpers({
  project() {
		return Projects.findOne({ _id: Template.instance().getProjectID() }) || {}
  }
})

Template.projectShow.events({})
