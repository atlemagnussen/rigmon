const formatter = require('./miner/formatter.js');
class Test {
    constructor() {
        this.config = {
            unit: "H/s"
        };
    }
    convert(data) {
        return formatter.xmrig(data);
    }
}
var tstdata = {
    "id": "b6fe7c5afa054b71",
    "worker_id": "atle-rig4",
    "version": "2.8.3",
    "kind": "cpu",
    "ua": "XMRig/2.8.3 (Windows NT 6.1; Win64; x64) libuv/1.23.1 gcc/8.2.0",
    "cpu": {
        "brand": "Intel(R) Core(TM) i5-7400 CPU @ 3.00GHz",
        "aes": true,
        "x64": true,
        "sockets": 1
    },
    "algo": "cryptonight",
    "hugepages": false,
    "donate_level": 5,
    "hashrate": {
        "total": [
            0.0,
            0.0,
            0.0
        ],
        "highest": 133.43,
        "threads": [
            [
                0.0,
                0.0,
                0.0
            ],
            [
                45.09,
                45.26,
                45.12
            ],
            [
                43.99,
                43.83,
                43.85
            ]
        ]
    },
    "results": {
        "diff_current": 6060,
        "shares_good": 41,
        "shares_total": 41,
        "avg_time": 38,
        "hashes_total": 318892,
        "best": [
            313192,
            294225,
            272820,
            206309,
            189714,
            139193,
            131900,
            90964,
            88805,
            73605
        ],
        "error_log": []
    },
    "connection": {
        "pool": "pool.monero.hashvault.pro:80",
        "uptime": 1586,
        "ping": 62,
        "failures": 0,
        "error_log": []
    }
};
var test = new Test();
var formatted = test.convert(tstdata);
console.log(formatted);
