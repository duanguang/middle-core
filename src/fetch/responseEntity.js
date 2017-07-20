import {JsonProperty,MapperEntity} from '../json-mapper-object';

export class DataRequestStateEnum{
    static Success=1;
    static Empty=0;
    static Error=-99;
    static Timeout=-1000;
    static NotFound=-404;
    static ServerError=500;
    static AuthFail=600;
}


class ErrorEntity{
    @JsonProperty('Code')
    code=void 0;

    @JsonProperty('Message')
    message=void 0;


    constructor(){
        this.code=void 0;
        this.message=void 0;
    }
}
export class ResponseErrorEntity {
    data = null;
    state = null;

    constructor(json) {
        json = json || {};
        this.state = json.state;
        this.data = this.parseErrorEntities(json.result);
    }

    parseErrorEntities(error) {
        error = error || new ErrorEntity();
        return MapperEntity(ErrorEntity, error);
    }
}

export class ResponseResult{
    result=void 0;
    state=void 0;
    constructor(fromService = {}){
        this.state=fromService.State;
        this.result=fromService.Result;
    }
}










/*class ResponseSuccessResult {
 result = void 0;
 state = void 0;
 resultObject = void 0;

 constructor(fromService) {
 this.result = fromService.Result;
 this.state = fromService.State;
 this.resultObject = this.getResultObject(this.result);
 }

 //noinspection JSMethodCanBeStatic
 getResultObject(result) {
 if (result) {
 try {
 return JSON.parse(result)
 } catch (err) {
 console.error(err);
 }
 }
 return null;
 }
 }

 class ResponseErrorResult {
 static getErrorResponseResult(params) {
 let responseInnerResult = {
 Message: params.message,
 Code: params.code
 };
 let responseOuterModel = {
 Result: JSON.stringify(responseInnerResult),
 State: params.state
 };
 return new ResponseErrorResult(responseOuterModel);
 }
 }*/