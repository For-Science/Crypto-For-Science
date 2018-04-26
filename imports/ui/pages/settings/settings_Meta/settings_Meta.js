import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { SiteMeta } from "/imports/api/siteMeta/both/siteMeta-collection.js"
import SiteMetaSchema from "/imports/api/siteMeta/both/schemas/siteMeta/siteMeta-schema.js"
// import * as permissions from "/imports/modules/permissions.js"

import "./settings_Meta.jade"
import "./settings_Meta-hooks.js"

Template.settings_Meta.onCreated(function() {

  this.autorun(() => {
    this.subscribe("siteMeta.metaDocument")
  })
})
Template.settings_Meta.helpers({
  updateSiteMetaSchema: function() {
    return SiteMetaSchema
  },
  siteMeta () {
    return SiteMeta.findOne() || {}
  }
})
