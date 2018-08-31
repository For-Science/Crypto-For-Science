import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"

import { Projects } from "/imports/api/projects/both/project-collection.js"
import { DonationClaims } from "/imports/api/donationClaims/both/donation-claim-collection.js"
import { Images } from '/imports/fileTransfer/images/both/images-collection.js';

import "./project-show.jade"

Template.projectShow.onCreated(function () {

	this.getSlug = () => FlowRouter.getParam("slug");


  this.autorun(() => {
    this.subscribe("donationClaims.forProject", {"slug":this.getSlug()} );
    this.subscribe("projects.single", {"slug":this.getSlug()} );
		this.subscribe("files.images.projectCover", {"slug":this.getSlug()} );
  })
})

Template.projectShow.onRendered(function () { })

Template.projectShow.onDestroyed(function () { })

Template.projectShow.helpers({
  project() {
    let project = Projects.findOne({ slug: Template.instance().getSlug() }) || false
		console.log("project:");
		console.log(JSON.stringify(project));
		return project;
  },
  donationClaims() {
    return DonationClaims.find({}, { sort: { createdAt: -1 } })
  },
	imageFile() {
    return Images.findOne({"meta.projectId" : Template.instance().getSlug(), "meta.type" : "projectPhoto"},{sort: {"meta.createdAt": -1}});
  }
})

Template.projectShow.events({})
