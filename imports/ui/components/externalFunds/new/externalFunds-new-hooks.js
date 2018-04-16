import { AutoForm } from "meteor/aldeed:autoform"
import { FlowRouter } from "meteor/kadira:flow-router"

import { notify } from "/imports/modules/notifier"

// ***************************************************************
// AUTOFORM HOOKS
// ***************************************************************

// Shows a simple message and re-routes if successful
AutoForm.addHooks(["externalFundNewForm"], {
  after: {
    method: (error, result) => {
      if (error) {
        console.log("Insert Error:", error.reason)
      } else {
				this.getProjectId = () => FlowRouter.getParam("projectId")
        FlowRouter.go("projectExternalFundsAdmin",{projectId: this.getProjectId() })
        notify("External funding added!", "success")
      }
    }
  }
})
