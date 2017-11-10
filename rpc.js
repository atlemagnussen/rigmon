var net = require('net');
var Rig = require('./rig.js')

class Tcp{
    constructor(params, req) {
        this.params = params;

        this.rig = new Rig(5000)
        .on('refresh', () => {
            this.connect();
        });

        this.socket = new net.Socket()
        .on('data', function(data) {
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
