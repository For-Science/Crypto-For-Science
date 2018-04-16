import { Template } from "meteor/templating"

import { Projects } from "/imports/api/projects/both/project-collection.js"

import "./project-index.jade"


Template.projectsIndex.onCreated(function() {
  this.subscribe("projects.all")
})

Template.projectsIndex.onRendered(function() {})

Template.projectsIndex.onDestroyed(function() {})

Template.projectsIndex.helpers ({
	projects() {
		return Projects.find({}, { sort: { createdAt: -1 } })
	}
})

Template.projectsIndex.events({})
