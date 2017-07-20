import {WebSocketHttp} from "../src/socket/index";
import expect from 'expect';



describe('WebSocketHttp', () => {
    it('basic', () => {
       var a=WebSocketHttp.getInstanceWebSocket('1');
       var b= WebSocketHttp.getInstanceWebSocket('1');

       console.log(a===b);
    });
});
