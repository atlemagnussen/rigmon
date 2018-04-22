# Rigmon

Miner monitor for different cpu and gpu miners.

Beta version 0.1.0

## How to run
copy config-example.json into a config folder and rename it config.json. Then add your own settings which hopefully are self explainatory.

## Supported miners
- [Claymore's Zcash AMD](https://bitcointalk.org/index.php?topic=1670733.0)  
Claymore always exposes it's api on port 3333, but you have to open up firewall
- [EWBF's Zcash NVIDIA](https://bitcointalk.org/index.php?topic=1707546.0)  
EWBF will not default expose it's api for other than localhost.  
Change this in miner.cfg file, line: api 127.0.0.1:42000 -> 192.168.1.11 or whatever the ip is. You can also change the port if that suits you.
- [XMRig CPU](https://github.com/xmrig/xmrig)
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

[![](https://codescene.io/projects/1987/status.svg) Get more details at **codescene.io**.](https://codescene.io/projects/1987/jobs/latest-successful/results)
