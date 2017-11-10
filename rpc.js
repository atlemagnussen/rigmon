var net = require('net');

class Rpc {
    constructor() {

    }
    get Tcp() {
        return RpcTpc;
    }
}

class RpcTpc {
    constructor(params) {
        super(params);
        this.params = params;
        this.socket = new net.Socket()
        .on('data', function(data) {
            console.log(data);
            var d = JSON.parse(data);
            console.log(JSON.stringify(d,null,2));
        })
        .on('close', function() {
            console.log('close');
        })
        .on('timeout', function() {
            console.log('timeout');
        })
        .on('error', function() {
            console.log('error');
        });
    }
    call(req) {
        this.socket.on('connect', function() {
            console.log(': connected to ' + this.remoteAddress + ':' + this.remotePort);
            this.write(req + '\n');
            this.setTimeout(30);
        });
        this.connect();
    }

    connect() {
        console.log(`connect ${this.params.host}:${this.params.port}`);
        this.socket.connect(this.params.port, this.params.host);
    }
}

//module.exports = Rpc;

var req = '{"id":0,"jsonrpc":"2.0","method":"miner_getstat1"}';
var rig2 = {
    "host": "57.57.57.6",
    "port": 3333
};
var rig3 = {
    "host": "57.57.57.7",
    "port": 3333
};
var rpcrig3 = new Rpc.Tcp(rig3);
var rpcrig2 = new Rpc.Tcp(rig2);

function poll(){
    rpcrig3.call(req);
    rpcrig2.call(req);
}

poll();
