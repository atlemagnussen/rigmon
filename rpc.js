var net = require('net');

class Tcp{
    constructor(params, req) {
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
        })
        .on('connect', function() {
            console.log(': connected to ' + this.remoteAddress + ':' + this.remotePort);
            this.write(req + '\n');
            this.setTimeout(30);
        });
    }

    connect() {
        console.log(`connect ${this.params.host}:${this.params.port}`);
        this.socket.connect(this.params.port, this.params.host);
    }
}

module.exports = {
    Tcp: Tcp
};
