import { Template } from "meteor/templating"
import { ReactiveVar } from 'meteor/reactive-var';
import { Images } from '/imports/fileTransfer/images/both/images-collection.js';

import "./images-upload.jade"
// import "./images-upload-hooks.js"

Template.uploadForm.onCreated(function () {
	this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
	currentUpload() {
		return Template.instance().currentUpload.get();
	}
});

Template.uploadForm.events({
	'change #projectImageInput'(e, template) {
		console.log("file attached to upload form");
		let projectId = $(e.target).data('projectid');
		let slug = $(e.target).data('slug');

		if (e.currentTarget.files && e.currentTarget.files[0]) {
			// We upload only one file, in case
			// multiple files were selected
			console.log("attempting to upload file");
			const upload = Images.insert({
				file: e.currentTarget.files[0],
				transport : 'http',
				streams: 'dynamic',
				chunkSize: 'dynamic',
				meta: {
					"projectId" : projectId,
					"slug" : slug,
					"type" : "projectPhoto",
					"createdAt": Date.now()
				}
			}, false);

			upload.on('start', function () {
				console.log("upload has started");
				template.currentUpload.set(this);
			});

			upload.on('end', function (error, fileObj) {
				console.log("upload has ended");
				template.currentUpload.set(false);
			});

			upload.on('uploaded', function (error, fileObj) {
				if (error) {
					console.log('Error during upload: ' + error);
				} else {
					console.log('File "' + fileObj.name + '" successfully uploaded');
					console.log(fileObj);
				}
			});

			upload.on('error', function (error, fileObj) {
				console.log('Error during upload: ' + error);
			});

			upload.start();
		}
	}
});