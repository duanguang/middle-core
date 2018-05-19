import invariant from 'invariant';
const SocketIO=require('socket.io-client');
var readyState={
    //正在链接的事件。
    connecting:'connecting',

    //连接已开启并准备好进行通信
    connected:'connected',

    //断开连接的事件
    disconnect:'disconnect',

    //连接错误事件处理
    error:'error',

    //连接超时的事件
    connect_timeout:'connect_timeout',

    //成功重新连接的事件
    reconnect:'reconnect',

    //正在重新连接
    reconnecting:'reconnecting',

    //重新连接失败
    reconnect_failed:'reconnect_failed',

    //连接失败的事件
    connect_failed:'connect_failed'
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
    static registerInstanceWebSocket(url,prams){
        if(this.wss.length===0){
            let socket=new SocketIO(url,{transports: ['websocket']});
            socket.status=readyState.connecting;
            this.wss.push({key:url,ws:socket});
        }
        else {
            let socket= this.getInstanceSocket(url);
            if(!socket||socket.status===readyState.disconnect){
                socket.status&&this.clear(url);
                //invariant(url, 'you must be pass in url');
                socket=new SocketIO(url);
                this.wss.push({key:url,ws:socket})
            }
        }
        this.initListerEvent(url,prams)
    }
    static initListerEvent(url,prams){
        invariant(url, 'url can not be undefined');
        let socket=this.getInstanceSocket(url);
        invariant(socket, 'socket can not be undefined');
        if(socket.status===readyState.connecting){
            socket.on('connect',(data)=>{
                socket.status=readyState.connected;
                socket.emit('send', prams);
            })
            socket.on('disconnect', (data) => {
                socket.status = readyState.disconnect;
            });

            socket.on('error', (err) => {
                socket.status = readyState.error;
            });

            socket.on('reconnect', (data) => {
                socket.status = readyState.connected;
            });
            socket.on('reconnecting', (data) => {
                socket.status =readyState.reconnecting;
            });

            socket.on('reconnect_failed', (error) => {
                socket.status = readyState.connect_failed;
            });
        }
    }
    static receiveMessage(url,fn){
        invariant(url, 'url can not be undefined');
        let socket=this.getInstanceSocket(url);
        invariant(socket, 'socket can not be undefined');
        socket.on('message', data => {
            fn&&fn(data);
        });
    }
    static sendMessage(url,prams){
        invariant(url, 'url can not be undefined');
        let socket=this.getInstanceSocket(url);
        invariant(socket, 'socket can not be undefined');
        socket.emit('send',prams);
    }
    static reappearOpenWebSocket(url,prams){
        this.registerInstanceWebSocket(url,prams);
    }
}