// Features components
import '../welcome/index.ts';

angular.module('app.core', [
    'ui.router',
    // Angular components
    // Shared components
    //'router',

    // Features components
    'app.welcome'

    // 3rd Party components
    //'ui.router'
]).run(startApp);
function startApp() {
    console.log('start77755577755555');
    //let configRoute={
    //    url:'',
    //    abstract:true,
    //    template:'<ui-view></ui-view>'
    //};
    //let configPage={
    //    access:'public'
    //};
    //router.setRoute('app',configRoute,configPage);
    //router.configureRoutes();
}