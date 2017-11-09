var net = require('net');

class Rpc {
    constructor(params) {
        this.params = params;
        this.socket = new net.Socket();
    }

    call(rpcCall) {
        
        connect();
    }

    connect() {
        this.socket.connect(params.server, params.port);
    }
}

module.exports = Rpc;
