import { AutoForm } from "meteor/aldeed:autoform"
import { FlowRouter } from "meteor/kadira:flow-router"

import { notify } from "/imports/modules/notifier"

// ***************************************************************
// AUTOFORM HOOKS
// ***************************************************************

// Shows a simple message and re-routes if successful
AutoForm.addHooks(["projectEditForm"], {
  after: {
    method: (error, result) => {
      if (error) {
        console.log("Insert Error:", error.reason)
      } else {
        FlowRouter.go("projectsIndex")
        notify("Project inserted!", "success")
      }
    }
  }
})
