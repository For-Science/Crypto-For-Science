import { FlowRouter } from "meteor/kadira:flow-router"
import { BlazeLayout } from "meteor/kadira:blaze-layout"

import "/imports/ui/components/projects/index/project-index.js"
import "/imports/ui/components/projects/new/project-new.js"
import "/imports/ui/components/projects/show/project-show.js"
import "/imports/ui/components/projects/edit/project-edit.js"

// project donations
import "/imports/ui/components/donationClaims/new/donationClaims-new.js"
import "/imports/ui/components/donationClaims/admin/donationClaims-admin.js"

// project external funds
import "/imports/ui/components/externalFunds/new/externalFunds-new.js"
import "/imports/ui/components/externalFunds/admin/externalFunds-admin.js"

// ***************************************************************
// Project routes
// ***************************************************************

// PROJECTS INDEX
// -------------------------------------------------------
FlowRouter.route("/projects", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectsIndex",
      footer: "footer"
    })
  },
  name: "projectsIndex"
})

// PROJECT NEW
// -------------------------------------------------------
FlowRouter.route("/projects/new", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectNew",
      footer: "footer"
    })
  },
  name: "projectNew"
})

// PROJECT SHOW
// -------------------------------------------------------
FlowRouter.route("/p/:slug", {
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectShow",
      footer: "footer"
    })
  },
  name: "projectShow"
})

// PROJECT EDIT
// -------------------------------------------------------
FlowRouter.route("/projects/m/:projectId/edit", { // m is short for manage
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectEdit",
      footer: "footer"
    })
  },
  name: "projectEdit"
})


// projectDonationClaim
// -------------------------------------------------------
FlowRouter.route("/projects/i/:projectId/claimADonation", { //
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectDonationClaimNew",
      footer: "footer"
    })
  },
  name: "projectDonationClaimNew"
})

// projectDonationClaimsAdmin
// -------------------------------------------------------
FlowRouter.route("/projects/m/:projectId/claims", { // m is short for manage
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectDonationClaimsAdmin",
      footer: "footer"
    })
  },
  name: "projectDonationClaimsAdmin"
})

// projectExternalFundsAdmin
// -------------------------------------------------------
FlowRouter.route("/projects/m/:projectId/externalFunds/manage", { // m is short for manage
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectExternalFundsAdmin",
      footer: "footer"
    })
  },
  name: "projectExternalFundsAdmin"
})

// projectExternalFundsNew
// -------------------------------------------------------
FlowRouter.route("/projects/m/:projectId/externalFunds/add", { // m is short for manage
  action: function () {
    BlazeLayout.render("layout", {
      header: "header",
      main: "projectExternalFundsNew",
      footer: "footer"
    })
  },
  name: "projectExternalFundsNew"
})

