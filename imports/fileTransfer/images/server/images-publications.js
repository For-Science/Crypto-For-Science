import { Meteor } from 'meteor/meteor';

import { Images } from '../both/images-collection.js';

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});

Meteor.publish("files.images.projectCover", function coverPhotoForProject({projectId, slug}) {
	// use the projectId to get the specific cover image
	console.log("publication files.images.projectCover called");
	if(!!projectId){
		console.log(`db.Images.find({"meta.projectId" : '${projectId}', "meta.type" : "projectPhoto"}).sort({"meta.createdAt": -1})`);
	  return Images.find({"meta.projectId" : projectId, "meta.type" : "projectPhoto"}, {sort: {"meta.createdAt": -1}}).cursor;
	}
	else if(!!slug){
		return Images.find({"meta.slug" : slug, "meta.type" : "projectPhoto"}, {sort: {"meta.createdAt": -1}}).cursor;
	}
	else{
		return false
	}

});