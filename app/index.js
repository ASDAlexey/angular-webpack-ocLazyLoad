import core from './components/core/index.js';
angular.module('app',[
    'app.core'
]);

angular.element(document).ready(function() {
    angular.bootstrap(document.documentElement, ['app'], {
        strictDi: true
    });
});