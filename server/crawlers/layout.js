
// need to import SSR
import {SSR , Template } from 'meteor/meteorhacks:ssr';

SSR.compileTemplate('seoLayout', Assets.getText('layout.html'));
Template.seoLayout.helpers({
  getDocType: function() {
    return "<!DOCTYPE html>";
  }
});