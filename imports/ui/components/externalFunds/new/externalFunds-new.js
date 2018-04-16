import { Template } from "meteor/templating"

import { Projects } from "/imports/api/projects/both/project-collection.js"

import ExternalFundsSchema from "/imports/api/externalFunds/both/schemas/externalFunds/externalFunds-schema.js"

import "./externalFunds-new.jade"
import "./externalFunds-new-hooks.js"

Template.projectExternalFundsNew.onCreated(function() {
	this.getProjectId = () => FlowRouter.getParam("projectId")

	this.autorun(() => {
    this.subscribe("projects.single", this.getProjectId())
  })
})

Template.projectExternalFundsNew.onRendered(function() {})

Template.projectExternalFundsNew.onDestroyed(function() {})

Template.projectExternalFundsNew.helpers({
  createExternalFundsSchema: function() {
    return ExternalFundsSchema
  },
	projectId: function(){
		return Template.instance().getProjectId()
	},
	projectName: function(){
		return Projects.findOne({ _id: Template.instance().getProjectId() }).title
	}
})

Template.projectExternalFundsNew.events({})
