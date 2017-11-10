const Rpc = require('./rpc.js');

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
