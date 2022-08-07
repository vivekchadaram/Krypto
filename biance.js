import WebSocket from 'ws';

const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
var x=0;
ws.onmessage = (e) =>{
    x=JSON.parse(e.data);
    // console.log(x.p)
}
console.log(x.p)