
import { Picker } from 'meteor/meteorhacks:picker';// import Picker
import {SSR , Template } from 'meteor/meteorhacks:ssr'; // import SSR
import { Projects } from "/imports/api/projects/both/project-collection.js"; // import Projects

var seoPicker = Picker.filter(function(req, res) {
  var isCrawler = [];
  var string = req.headers['user-agent'];
  isCrawler.push(/_escaped_fragment_/.test(req.url));
  if(string){
      isCrawler.push(string.indexOf('facebookexternalhit') >= 0);
      isCrawler.push(string.indexOf('Slack') >= 0);
      isCrawler.push(string.indexOf('Twitterbot') >= 0);
  }
  return isCrawler.indexOf(true) >= 0;
});

seoPicker.route('/', function(params, req, res){
    var html = SSR.render('seoLayout',{
        template:'ssr_home',
				data: {}
    });
    res.end(html);
});

seoPicker.route('/projects/:projectID', function(params, req, res){
    var project = Projects.findOne({_id:params.projectID});
    var html = SSR.render('seoLayout',{
        template:'ssr_projectShow',
        data: {project:project}
    });
    res.end(html);
});