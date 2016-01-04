import './components/core/index.ts';
angular.module('app', [
    "app.core"
]);

angular.element(document).ready(function () {
    angular.bootstrap(document.documentElement, ['app'], {
        strictDi: true
    });
});