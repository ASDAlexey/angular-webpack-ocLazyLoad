import "./assets/styles/index.styl";
import "./assets/styles/_html.styl";
import {config as routesConfig} from "./routes";
import {Welcome} from "./welcome.directive";
let module = angular
    .module('app.welcome', [])
    .directive("welcome", ($timeout) => {
        return new Welcome($timeout);
    })
    .config(routesConfig);