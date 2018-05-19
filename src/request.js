import {superagent as request} from 'brains/lib/request';

export default request;

const DefaultOption = {
    processData: false,
    dataType: 'json',
    contentType: 'application/json'
};

export async function post(url, data, options) {
    return new Promise((resolve, reject) => {
        request.post(url)
            .set(options||DefaultOption)
            //.set(option)
            .send(data)
            .end(function (err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.body||res.text);
            })
    });
}


export function get(url, data, option){
    const req = request.get(url).query(data);
    return doRequest(req, option);
}

function doRequest(req, option) {
    option = Object.assign({}, DefaultOption, option);
    return new Promise((resolve, reject) => {
        req.set(option).end(function (err, res) {
            if(!err){
                err = checkBusinessError(res.body);
            }

            if (err) {
                reject(err);
                return;
            }
            let result=res.body||res.text;
            if(typeof result==='object'){
                resolve(result);
            }
            else {
                resolve(JSON.parse(result));
            }
        });
    });
}

function checkBusinessError(body) {
    if (body && body.IsSuccess == false) {
        return new Error(body.Message || "业务操作异常");
    }
    return null;
}