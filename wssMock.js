class WssMock {
    constructor() {
        this.clients = [];
    }
    send() {
        console.log("wss mock send");
    }
}
module.exports = WssMock;
