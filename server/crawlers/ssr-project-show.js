
import {SSR , Template } from 'meteor/meteorhacks:ssr';

SSR.compileTemplate('ssr_projectShow', Assets.getText('SSR-project-show.html'));
Template.ssr_projectShow.helpers({})