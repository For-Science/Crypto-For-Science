
import { Picker } from 'meteor/meteorhacks:picker';// import Picker
import {SSR , Template } from 'meteor/meteorhacks:ssr'; // import SSR
import { Projects } from "/imports/api/projects/both/project-collection.js"; // import Projects
import { SiteMeta } from "/imports/api/siteMeta/both/siteMeta-collection.js" // import site Meta
import { Images } from '/imports/fileTransfer/images/both/images-collection.js'; // images for meta tags

let seoPicker = Picker.filter(function(req, res) {
  let isCrawler = [];
  let string = req.headers['user-agent'];
  isCrawler.push(/_escaped_fragment_/.test(req.url));
  if(string){
      isCrawler.push(string.indexOf('facebookexternalhit') >= 0);
      isCrawler.push(string.indexOf('Slack') >= 0);
      isCrawler.push(string.indexOf('Twitterbot') >= 0);
  }
  return isCrawler.indexOf(true) >= 0;
});

seoPicker.route('/', function(params, req, res){
		let siteMeta = SiteMeta.findOne();
    let html = SSR.render('seoLayout',{
        template:'ssr_home',
				data: {siteMeta:siteMeta}
    });
    res.end(html);
});

// seoPicker.route('/projects/p/:projectId/:slug/', function(params, req, res){
seoPicker.route('/projects/:slug/', function(params, req, res){
		console.log("crawler route called for project");
    let project = Projects.findOne({"slug":params.slug});
		console.log("project:");
		console.log(project);
		let coverImage = Images.findOne({"meta.slug" : params.slug, "meta.type" : "projectPhoto"},{sort: {"meta.createdAt": -1}});
    let html = SSR.render('seoLayout',{
        template:'ssr_projectShow',
        data: {project:project, coverImage:coverImage||""}
    });
    res.end(html);
});