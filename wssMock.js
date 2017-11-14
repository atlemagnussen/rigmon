class WssMock {
    constructor() {
        this.clients = new Set();
    }
    send() {
        console.log("wss mock send");
    }
}
module.exports = WssMock;

