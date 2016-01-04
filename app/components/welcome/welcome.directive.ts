let welcome = require('./assets/templates/welcome');
class WelcomeDirectiveCtrl {
    constructor(private $timeout:ng.ITimeoutService) {
        "ngInject";
        console.log('ssss34534534543543535')
    }
}
export class Welcome implements ng.IDirective {
    constructor(private $timeout) {
        "ngInject";
    }

    public restrict:string = "E";
    public replace:boolean = true;
    public transclude:boolean = true;
    public template:string = welcome;
    scope:any = {
        count: "@"
    };
    public controller:Function = WelcomeDirectiveCtrl;
    public controllerAs:string = 'vmD';
    public bindToController:boolean = true;
    link:ng.IDirectiveLinkFn = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes, ctrls, transludeFn) => {
        this.$timeout(()=> {
            console.log('timeout in link');
        }, 0)
    };
}