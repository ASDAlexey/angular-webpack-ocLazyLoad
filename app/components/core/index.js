// Features components
import welcome from '../welcome/index.js';

let module=angular.module('app.core',[
    // Angular components
    // Shared components
    //'router',

    // Features components
    'app.welcome'

    // 3rd Party components
    //'ui.router'
]).run(startApp);
function startApp(){
    console.log('start777');
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
export default module;
