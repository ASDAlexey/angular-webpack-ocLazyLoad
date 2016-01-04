import Controller from './welcome.controller';
let Template = require('./assets/templates');
export function config($stateProvider:angular.ui.IStateProvider):void {
    "ngInject";
    $stateProvider.state('welcome', {
        url: "/",
        template: Template,
        controller: Controller,
        controllerAs: 'vm'
    });
}