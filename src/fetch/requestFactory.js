import {IResponseModel} from './fetchRequest';
//import {logger} from './logger';
import {DataRequestStateEnum} from "./responseEntity";
/*import  Modal from 'antd/lib/Modal';*/

function rejectLogin(message) {
    /*Modal.warning({
        title: '请先登录',
        content: '您的帐号还未登录',
        onOk() {
            setTimeout(() => {
                window.location.hash = '#user/login'
            }, 1000)

        },
    });*/
}

export class requestFactory{
    static emitErrorHandler(response){
        if (!response.result) {
            //logger(new Error(JSON.stringify(response)), 'fatal');
            return;
        }
        if (response.state===DataRequestStateEnum.AuthFail) {
            rejectLogin();
        }
        /*else if (response.isCommonErrorStatus()) {
         message.error(response.message);
         }*/
    }
}