# Rigmon

Miner monitor for different cpu and gpu miners.

Beta version 0.1.0

## How to run
copy `config-example.json` into folder `./config` and rename it `config.json.` Then add your own settings which hopefully are self explainatory.
[config-example.json](https://github.com/atlemagnussen/rigmon/blob/master/config-example.json)
## Supported miners
- [Claymore's Zcash AMD](https://bitcointalk.org/index.php?topic=1670733.0)  
Claymore always exposes it's api on port 3333, but you have to open up firewall
- [EWBF's Zcash NVIDIA](https://bitcointalk.org/index.php?topic=1707546.0)  
EWBF will not default expose it's api for other than localhost.  
Change this in miner.cfg file, line: api 127.0.0.1:42000 -> 192.168.1.11 or whatever the ip is. You can also change the port if that suits you.
- [XMRig CPU/AMD/NVIDIA](https://github.com/xmrig)
XMRig does not expose by default, set api.port in config.json file
### Roadmap
- [Claymore's Dual AMD/NVIDIA](https://bitcointalk.org/index.php?topic=1433925.0)
- [Claymore's CryptoNote AMD](https://bitcointalk.org/index.php?topic=638915.0)
- [Claymore's CryptoNote CPU](https://bitcointalk.org/index.php?topic=647251.0)
### Dev Dependencies
- Node.js
- install dependencies `npm install`  
### Debug run
- `node server.js`

## GUI
### desktop
- Click "connect" to get continuous updates via websocket
- Click "update" to get instant update
- Click "config" if you just updated configuration
![desktop img](https://s3-eu-west-1.amazonaws.com/atle-static/rigmon-desktop.png)

### mobile
- Will update once you open
- Double tap to update again
https://s3-eu-west-1.amazonaws.com/atle-static/rigmon-mobile.png
