import Styles from './assets/styles';
import Controller from './welcome.controller.js';
import Template from './index';

var module = angular
    .module('app.welcome', [])
    .run(startWelcome)
    .controller('Welcome', Controller);

function startWelcome(){
    console.log('sdfsdf777');
    //var configRoute = {
    //    url: '/welcome',
    //    template: template,
    //    controller: 'Welcome as welcome'
    //};
    //
    //var configPage = {
    //    theme: 'light',
    //    title: `Welcome Tour | ${config.title}`
    //};
    //
    //router.setRoute('app.welcome', configRoute, configPage);
}

export default module;