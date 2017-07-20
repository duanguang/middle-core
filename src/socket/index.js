import invariant from 'invariant';

var readyState={
    //连接还没开启。
    connecting:0,

    //连接已开启并准备好进行通信
    open:1,

    //连接正在关闭的过程中
    closing:2,

    //连接已经关闭，或者连接无法建立
    closed:3
}
export class WebSocketUtil{
    //static ws=null;
    static wss=[];
    constructor(){
    }

    static getInstanceSocket(key) {
        let socket = this.wss.map((ws) => {
            if (ws.key && ws.key === key) {
                return ws.ws;
            }
        });
        return socket[0] && socket[0];
    }
    static clear(key){
        this.wss.map((ws,index) => {
            if (ws.key && ws.key === key) {
                WebSocketUtil.wss.splice(index);
            }
        });
    }
    static registerInstanceWebSocket(url,initSendTitle){
        var host = window.document.location.host.replace(/:.*/, '');
        url=url||`ws://${host}:8080`;
        if(this.wss.length===0){
            let socket=new WebSocket(url);
            this.wss.push({key:url,ws:socket});
        }
        else {
            let socket= this.getInstanceSocket(url);
            if(!socket||socket.readyState===readyState.closed){
                socket.readyState&&this.clear(url);
                //invariant(url, 'you must be pass in url');
                socket=new WebSocket(url);
                this.wss.push({key:url,ws:socket})
            }
        }
        this.initListerEvent(url,initSendTitle)
    }
    /*static getInstanceWebSocket(url){
     if(!this.ws||this.ws.readyState===readyState.closed){
     //invariant(url, 'you must be pass in url');
     var host = window.document.location.host.replace(/:.*!/, '');
     url=url||`ws://${host}:8080`;
     this.ws=new WebSocket(url);
     }
     return this.ws;
     }*/
    static initListerEvent(url,initSendTitle){
        invariant(url, 'url can not be undefined');
        let socket=this.getInstanceSocket(url);
        invariant(socket, 'socket can not be undefined');
        if(!socket.onopen){
            socket.onopen=function (event) {
                initSendTitle&&this.send(initSendTitle);
            }
        }
        if(!socket.onclose){
            socket.onclose=function (event) {
                console.log('关闭');
                console.log(event)
            }
        }
    }
    static receiveMessage(url,fn){
        invariant(url, 'url can not be undefined');
        let socket=this.getInstanceSocket(url);
        invariant(socket, 'socket can not be undefined');
        socket.onmessage = function (event) {
            console.log(event);
            fn&&fn(event.data);
        };
    }
    static reappearOpenWebSocket(url,initOpenTitle){
        this.registerInstanceWebSocket(url,initOpenTitle);
    }
}