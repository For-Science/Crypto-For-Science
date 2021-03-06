import { Meteor } from "meteor/meteor"
import { Roles } from "meteor/alanning:roles"
import { Accounts } from "meteor/accounts-base"
import { Projects } from "/imports/api/projects/both/project-collection.js"
import { ExternalFunds } from "/imports/api/externalFunds/both/externalFunds-collection.js"
import { SiteMeta } from "/imports/api/siteMeta/both/siteMeta-collection.js"
// ***************************************************************
// Fixtures (generate dummy data)
// ***************************************************************

let siteMetaDescription = "Crypto For Science is a crowdfunding platform that uses the spirit of cryptocurrency in order to fund scientific research: no fees and no intermediaries - all the funds go directly to the researchers"

let publishProject = (projectId) => {
	Projects.update(
		projectId,
		{
			$set: {
				"bools.reviewed": true,
				"bools.approved": true,
			}
		},
		function(error, result) {
			if (error) {
				throw new Meteor.Error(500, "Server error")
			}
		}
	);
}

let featureProject = (projectId) => {
	Projects.update(
		projectId,
		{
			$set: {
				"bools.reviewed": true,
				"bools.approved": true,
				"bools.isFeatured": true,
			}
		},
		function(error, result) {
			if (error) {
				throw new Meteor.Error(500, "Server error")
			}
		}
	);
}

let setEndDate = (projectId, numDays, percentComplete) => {
	let startDate = new Date();
	let endDate = new Date();
	startDate.setDate(startDate.getDate()-(numDays*( percentComplete )));
	endDate.setDate(endDate.getDate()+(numDays*( 1 - percentComplete )));

	Projects.update(
		projectId,
		{
			$set: {
				"timePeriods.startDate": startDate,
				"timePeriods.endDate": endDate,
			}
		},
		function(error, result) {
			if (error) {
				throw new Meteor.Error(500, "Server error")
			}
		}
	);

}

let addExternalFundsforProject = (totalRaised, project_id) => {
	ExternalFunds.insert(
		{
			title : "initial",
			amount: totalRaised,
			projectId: project_id,
		}
	);
}

Meteor.startup(() => {



	if (Meteor.users.find().count() === 0) { 	// seed 'administrator' role user
																						// so that new admins can be added via database
																						// you're going to want to not have this in production
		const seedUserId = Accounts.createUser({
			email: 'app_admin@cryptoforscience.com',
			password: 'app_admin-password'
		});

		Roles.addUsersToRoles(seedUserId,'administrator',Roles.GLOBAL_GROUP)
	}

	if (Projects.find().count() === 0) { // seed projects
		Projects.insert(
			{
				"title" : "Waterbear Genome Project",
				"qa" : {
						"summary" : "We're going to sequence the tardigrade genome.",
						"whyUseful" : "Tardigrades are one of the most resilient known animals, with individual species able to survive extreme conditions that would be rapidly fatal to nearly all other known life forms, such as exposure to extreme temperatures, extreme pressures (both high and low), air deprivation, radiation, dehydration, and starvation. About 1,150 known species form the phylum Tardigrada, a part of the superphylum Ecdysozoa. The group includes fossils dating from 530 million years ago, in the Cambrian period.",
						"howMuchTime" : "It will take us about a month to do the sequencing. Afterwards it will take another two months for data analysis. We also intend to produce data exports of the genome compatible with various genome software used in the scientific community today.",
						"howFundsWillbeSpent" : "Most of the funds will go towards the equipment use, operator expenses, as well as raw materials needed to sequence the genome. The rest of the funding will go towards funding the data analysis and packaging.",
						"description" : "This was just a dummy placeholder. Please do not take this research project seriously. But if you are a scientist and would like to seek funding to complete a research project, go ahead and submit your project. We will review it and if approved it will be published on Crypto For Science for anyone to donate, without any fees."
				},
				"goals" : {
						"projectGoal" : 3500000000,
						"softGoal" : 80000000
				},
				"raised" : {
					"totalRaised" : 2100000000
				},
				"timePeriods" : {
						"timePeriod" : 30
				},
				"cryptoAddresses" : {
						"ETH" : "0xBd1123Ae4D65ef644F06266c67BD0044bbC74ae5",
				},
				"contact" : {
						"contactName" : "Joseph Allen",
						"phone" : "9-999-999-9999",
						"email" : "bhkbkhbkhb@sdgssg.com"
				},
			},
			function(error, project_id) {
				if (error) {
					throw new Meteor.Error(500, "Server error")
				}
				else{

					featureProject(project_id) // publish and feature the project
					// add ExternalFunds for Project
					let newProject = Projects.findOne({"_id" : project_id})
					setEndDate(project_id, newProject.timePeriods.timePeriod, .25);
					if(newProject.raised.totalRaised > 0){
						addExternalFundsforProject(newProject.raised.totalRaised, project_id);
					}
				}
			}
		);

		Projects.insert(
			{
				"title" : "Cat Ecology",
				"qa" : {
						"summary" : "What is the most pleasing scratching post material for cats?",
						"whyUseful" : `
							It is estimated that in the global economy, cats account for billions of dollars
							in annual furniture damages. As many cat owners know,
							cats love to scratch even if they don’t have a post to do it on.
							This means that they’ll find something else to claw, often precious
							furniture. Understanding the prime materials to use in scratching
							posts could not only prevent billions of dollars in discarded /
							unwanted furniture, but also shine light on a novel use for recycled materials.
						`,
						"howMuchTime" : `
							Getting this one right will require extensive cat play-time. Cats
							are known to be finnicky about their toys, and even though they may
							appear to be in love with their scratching post at first, as the scratching post
							wears out and changes in appearance over time, they may begin to eyeball
							the pristine, unscathed sofa in the living room on the way to their litter box.
							We estimate 10 years experimentation.
						`,
						"howFundsWillbeSpent" : `
							There's no way around it- these cats are going to tear through lots
							of brand new furniture. Our goal is to identify a scratching post material that is so pleasing
							to the cats that they will no longer want to sink their claws inside a brand new
							leather couch. We're going to go through a lot of brand new furniture, a lot
							of cat food, and a lot of cat litter, for science.
						`,
						"description" : `
							This was just a dummy placeholder. Please do not take this research
							project seriously. But if you are a scientist and would like to seek
							funding to complete a research project, go ahead and submit your project.
							We will review it and if approved it will be published on Crypto For Science
							for anyone to donate, without any fees.
						`
				},
				"goals" : {
						"projectGoal" : 80000000,
						"softGoal" : 200000
				},
				"raised" : {
					"totalRaised" : 24000000
				},
				"timePeriods" : {
						"timePeriod" : 30
				},
				"cryptoAddresses" : {
						"ETH" : "0x396dF9Bc55900466046EcE519aE3882524Ab59b8",
						"BTC" : "1NxaBCFQwejSZbQfWcYNwgqML5wWoE3rK4",
				},
				"contact" : {
						"contactName" : "Sandra Johnson",
						"phone" : "9-999-999-9999",
						"email" : "asdadasd@sdgssg.com"
				},
			},
			function(error, project_id) {
				if (error) {
					throw new Meteor.Error(500, "Server error")
				}
				else{
					publishProject(project_id) // just publish it, don't feature it
					// add ExternalFunds for Project
					let newProject = Projects.findOne({"_id" : project_id})
					setEndDate(project_id, newProject.timePeriods.timePeriod, .75);
					if(newProject.raised.totalRaised > 0){
						addExternalFundsforProject(newProject.raised.totalRaised, project_id);
					}
				}
			}
		);
	}

	if (SiteMeta.find().count() === 0) { // set up site meta
		SiteMeta.insert(
			{
				"crawlers" : {
					"facebookOpenGraph" : {
						"description" : siteMetaDescription
					}
				}
			},
			function(error, project_id) {
				if (error) {
					throw new Meteor.Error(500, "Server error")
				}
			}
		);
	}

})
