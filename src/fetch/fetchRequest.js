import {fetch} from 'brains/lib/request';
import {requestFactory} from "./requestFactory";
import { ResponseResult,ResponseErrorEntity,DataRequestStateEnum } from "./responseEntity";




class RequestInterceptor{
    /*Array<(config:IRequestConfigs)=>Promise|any>
    IRequestConfigs{
    url:string;
    options:IFetchRequestOption  extends RequestInit{
             params?:Object;
             body?:string;
             method?:'get'|'post';
             Clazz?:new (json?)=>any;
          }
    }*/
    requests=null;

    //(response)=>Promise|any
    responses=null;
    responseRejects=null;

    constructor(){
        this.requests=[];
        this.responses=[];
        this.responseRejects=[];
    }
    /*interceptor:{
    request?:(config:IRequestConfigs)=>IPromise|any;
    response?:(response)=>IPromise|any;
    responseReject?:(response)=>IPromise|any;}*/
    register(interceptor){
        const {requests,responses,responseRejects}=this;
        const {request,response,responseReject}=interceptor;
        request&&requests.push(request);
        response&&responses.push(response);
        responseReject&&responseRejects.push(responseReject);
    }

    wrapClazzPromise(promise, Clazz) {
        if (Clazz) {
            return promise.then((data) => {
                if(data.state===DataRequestStateEnum.Success){
                    return new Clazz(data);
                }
            }, (error) => {//处理Promise.reject
                Clazz = ResponseErrorEntity;
                return new Clazz(error);
            })
        }
        return promise;
    }


    get(url, data, Clazz, options) {
        // 重载
        if (typeof data === 'function') {
            Clazz = data;
        }
        if (typeof Clazz === `object`) {
            options = Clazz;
        }
        options = options || {};
        data && (options.params = data);
        options.method = 'get';
        let promise = this.send({url, options});
        promise = this.wrapClazzPromise(promise, Clazz);
        return promise;
    }


    post(url, data, Clazz, options) {
        // 重载
        if (typeof data === 'function') {
            Clazz = data;
        }
        if (typeof Clazz === `object`) {
            options = Clazz;
        }
        options = options || {};
        data && (options.body = JSON.stringify(data));
        options.method = 'post';
        let promise = this.send({url, options});
        promise = this.wrapClazzPromise(promise, Clazz);
        return promise;
    }

    send(configs) {
        const { requests, responses, responseRejects } = this;
        //遍历请求前的拦截方法
        const requestPromise = requests.reduce((prev, cur) => {
            return prev.then(cur);
        }, Promise.resolve(configs));
        //请求
        let response = requestPromise.then((configs) => {
            var paramsArray = [];
            let params = configs.options.params;
            if (params instanceof Object) {
                Object.keys(params).forEach(key => {
                    paramsArray.push(`${key}=${params[key]}`);
                });
                if (paramsArray.length > 0) {
                    configs.url = configs.url.concat('?', paramsArray.join('&'));
                }
            }
            //
            return fetch(configs.url, configs.options);
        });
        // 遍历返回后的拦截失败方法
        response = responses.reduce((prev, cur) => {
            return prev.then(cur);
        }, response);
        // 遍历返回后的拦截失败方法
        return responseRejects.reduce((prev, cur) => {
            return prev.then(void 0, cur);
        }, response);
    }
}

const requestInterceptor = new RequestInterceptor();

//注册拦截请求, 默认所有请求返回json格式
requestInterceptor.register({
    request: (configs) => {
        let headers = configs.options.headers = configs.options.headers || {};
        headers[`Content-Type`] = `application/json`;
        configs.options.credentials = 'include';
        return configs;
    },
});

//注册请求, 请求默认携带验证参数
requestInterceptor.register({
    request: (configs) => {
        let headers = configs.options.headers = configs.options.headers || {};
        // headers['Token'] = VAuthEntity.getAuth().token;
        return configs;
    }
});
requestInterceptor.register({
    response: (response) => {
        return response.json();
    }
});
requestInterceptor.register({
    //response已经被反序列化, 返回了对应对象
    response: (response) => {
        const responseModel = new ResponseResult(response);
        //responseModel.state=DataRequestStateEnum.Error;
        //console.log(responseModel);
        if(responseModel.state!==DataRequestStateEnum.Success){
            return Promise.reject(responseModel);
        }
        return responseModel;
    }
});
requestInterceptor.register({
    responseReject: (response) => {
        //类型转换失败
        if (response instanceof TypeError) {
            console.error(response);
        }
        else if(!response.state){
            console.error('接口结构约定不一致，数据解析失败');
        }
        else if (response instanceof ResponseResult) {
            requestFactory.emitErrorHandler(response);
        }
        return Promise.reject(response);
    }
});
export const get = requestInterceptor.get.bind(requestInterceptor);
export const post = requestInterceptor.post.bind(requestInterceptor);