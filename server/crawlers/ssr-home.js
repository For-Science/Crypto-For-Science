
import {SSR , Template } from 'meteor/meteorhacks:ssr';

SSR.compileTemplate('ssr_home', Assets.getText('SSR-home.html'));
Template.ssr_home.helpers({})