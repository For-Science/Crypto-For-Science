import "./frontpage.jade"
import "/imports/ui/elements/projectCard.jade"
import "/imports/ui/elements/progressBar.jade"

import { Projects } from "/imports/api/projects/both/project-collection.js"

Template.frontpage.onCreated(function() {
  this.subscribe("projects.featured")
})

Template.frontpage.helpers ({
	projects() {
    // return Projects_featured
		return Projects.find({}, { sort: { createdAt: -1 } })
  },
	site() {
    return {
			title: "Crypto for Science",
			tagline: `
				Crypto For Science is a crowdfunding platform that
				uses the spirit of cryptocurrency in order to fund
				scientific research: no fees and no intermediaries
				- all the funds go directly to the researchers
				`
		}
  }
})