import { FlowRouter } from "meteor/kadira:flow-router"
import { BlazeLayout } from "meteor/kadira:blaze-layout"

// import "/imports/ui/components/settings/settings_myProjects/settings_myProjects.js"
import "/imports/ui/pages/settings/settings.js"

// ***************************************************************
// Settings routes
// ***************************************************************

// SETTINGS
// -------------------------------------------------------
FlowRouter.route("/settings/myProjects", {
  action: function() {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_myProjects"
})

// MY DONATIONS
FlowRouter.route("/settings/myDonations", {
  action: function() {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_myDonations"
})

// ADMIN
FlowRouter.route("/settings/admin", {
  action: function() {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_admin"
})