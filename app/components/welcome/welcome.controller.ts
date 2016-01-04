declare var angular:any;
interface IController {
    //form_set_dirty(form:{}):void;
    //action:string;
    dataForm:{}
    a:string
}
class Controller implements IController {
    dataForm:{};
    a:string;
    //action:string;
    constructor(private $timeout:ng.ITimeoutService) {
        "ngInject";
        console.log('ssss7777');
        this.dataForm = {};
        this.a = 'aaa555';
        $timeout(()=> {
            console.log('ssssss77777777777777');
        }, 0)
    }
}
export default Controller;