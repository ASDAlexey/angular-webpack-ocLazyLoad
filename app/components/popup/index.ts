import "./assets/styles/index.styl";
import {config as routesConfig} from "./routes";
import {Welcome} from "./popup.directive";
export default angular
    .module('app.popup', [])
    /*.directive("popup", ($timeout) => {
        return new Welcome($timeout);
    })*/
    .config(routesConfig)
    .name;