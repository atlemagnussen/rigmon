# Rigmon

Miner monitor for different CPU and GPU miners. Supports different miner software per rig/PC.

Quick overview of the config structure:
```json
{
    "rigs": {
        "rig1": {
            "host": "192.168.1.10",
            "miners": [
                {
                    "enabled": true,
                    "type": "claymore",
                    "port": 3333,
                    "unit": "H/s"
                },
                {
                    "enabled": false,
                    "type": "ewbf",
                    "port": 42000,
                    "unit": "H/s"
                }
            ]
        },
        "rig2": {
            "host": "192.168.1.11",
            "miners": "..."
```

## How to run
copy `config-example.json` into folder `./config` and rename it `config.json.` Then add your own settings which hopefully are self explainatory.
[config-example.json](https://github.com/atlemagnussen/rigmon/blob/master/config-example.json)
## Supported miners
- [Claymore's Zcash AMD](https://bitcointalk.org/index.php?topic=1670733.0)  
Claymore always exposes its API on port 3333, but you have to open up the firewall
- [EWBF's Zcash NVIDIA](https://bitcointalk.org/index.php?topic=1707546.0)  
EWBF will not default expose its API for other than localhost.  
Change this in miner.cfg file, line: API 127.0.0.1:42000 → 192.168.1.11 or whatever the IP is. You can also change the port if that suits you.
- [XMRig CPU/AMD/NVIDIA](https://github.com/xmrig)
XMRig does not expose by default, set api.port in the config.json file
### Roadmap
- [Claymore's Dual AMD/NVIDIA](https://bitcointalk.org/index.php?topic=1433925.0)
- [Claymore's CryptoNote AMD](https://bitcointalk.org/index.php?topic=638915.0)
- [Claymore's CryptoNote CPU](https://bitcointalk.org/index.php?topic=647251.0)
### Dev Dependencies
- Node.js
- Install dependencies `npm install`  
### Debug run
- `node server.js`

## GUI
### desktop
- Click "connect" to get continuous updates via WebSocket
- Click "update" to get instant update
- Click "config" if you just updated configuration

![desktop img](https://s3-eu-west-1.amazonaws.com/atle-static/rigmon-desktop.png)

### mobile
- Will update once you open
- Double tap to update again

![mobile img](https://s3-eu-west-1.amazonaws.com/atle-static/rigmon-mobile.png)
