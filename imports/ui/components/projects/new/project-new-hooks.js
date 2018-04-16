import { AutoForm } from "meteor/aldeed:autoform"
import { FlowRouter } from "meteor/kadira:flow-router"

import { notify } from "/imports/modules/notifier"

// ***************************************************************
// AUTOFORM HOOKS
// ***************************************************************

// Shows a simple message and re-routes if successful
AutoForm.addHooks(["projectNewForm"], {
  after: {
    method: (error, result) => {
      if (error) {
        console.log("Insert Error:", error.reason)
      } else {
        FlowRouter.go("settings_myProjects")
        notify("Project submitted!", "success")
      }
    }
  }
})
