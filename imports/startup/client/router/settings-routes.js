import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

import "/imports/ui/pages/settings/settings.js";
import "/imports/ui/pages/settings/settings_Meta/settings_Meta.js";
import "/imports/ui/pages/settings/settings_MyProjects/settings_MyProjects.js";

// ***************************************************************
// Settings routes
// ***************************************************************

// SETTINGS
// -------------------------------------------------------
FlowRouter.route("/settings/myProjects", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_myProjects"
})

// MY DONATION CLAIMS
FlowRouter.route("/settings/myDonationClaims", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_myDonationClaims"
})

// ADMIN
FlowRouter.route("/settings/admin", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_admin"
})

// meta info for crawlers
FlowRouter.route("/settings/meta", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "settings",
      footer: "footer"
    })
  },
  name: "settings_seo"
})