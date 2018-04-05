import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"
import { Roles } from "meteor/alanning:roles"
import { round } from "/imports/lib/functions.js"

import { Projects } from "./project-collection.js"
import ProjectsSchema from "./schemas/projects/projects-schema.js"

import { ExternalFunds } from "/imports/api/externalFunds/both/externalFunds-collection.js"

import * as permissions from "/imports/modules/permissions.js"


// ***************************************************************
// METHODS (related to the projects collection)
// ***************************************************************



export const createProject = new ValidatedMethod({
  name: "projects.create",
  validate: ProjectsSchema.validator(),
  run(project) {

		if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error('projects.create',
        'Must be logged in to submit a project.');
    }

    // TODO: Any additional validation

		// multiply goal/raised values by 100 to get them into cents. JS' Math doesn't round very accurately, so custom rounding function.
		project.goals.projectGoal = round(round((project.goals.projectGoal),2)*100)
		project.goals.softGoal = round(round((project.goals.softGoal),2)*100)
		project.raised.totalRaised = round(round((project.raised.totalRaised),2)*100)
		// project.raised.percentRaised = (project.raised.percentRaised)*100 // phasing out percentRaised


    return Projects.insert(
			project, // this is just the form data from autoform... already in the format needed.
      function(error, project_id) {
        if (error) {
					// console.log(error)
          throw new Meteor.Error(500, "Server error")
        }
				else{
					let newProject = Projects.findOne({"_id" : project_id})
					Roles.addUsersToRoles(newProject.owner, 'researcher', project_id)

					// if the user set an initial contribution when creating the project, add it to the externalFunds collection
					if(newProject.raised.totalRaised > 0){
						// add the initial reported amount to externalFunds collection
						ExternalFunds.insert(
							{
								title : "initial",
							  amount: newProject.raised.totalRaised,
								projectId: project_id,
							}
						);
					}
				}
      }
    )
  }
})

export const updateProject = new ValidatedMethod({
  name: "projects.update",
  // validate: UpdateDocumentSchema.validator(),
	validate: ProjectsSchema.validator(),
  run(project) {
    // Additional data verification

		// this meteor user needs to be able to edit this project
		if (!this.userId) {
      // Throw errors with a specific error code
      throw new Meteor.Error('projects.create',
        'Must be logged in to edit a project.');
    }
		if (!permissions.canEditProject(project._id)) {
			throw new Meteor.Error('projects.create',
        "Does not have necessary permissions to edit project");
		}

    return Projects.update(
      project._id,
      {
        $set: project
      },
      function(error, result) {
        if (error) {
          throw new Meteor.Error(500, "Server error")
        }
      }
    )
  }
})

export const deleteProject = new ValidatedMethod({
  name: "projects.delete",
  validate: new SimpleSchema({
    documentId: { type: String }
  }).validator(),
  run({ projectId }) {
    // Additional data verification

    return Projects.remove(projectId, function(error, result) {
      if (error) {
        throw new Meteor.Error(500, "Server error")
      }
    })
  }
})
