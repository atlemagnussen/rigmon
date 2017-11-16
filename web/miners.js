/* miners components*/
"use strict";

class Miners extends HTMLElement {
    constructor() {
        super();
        this.miners = [];
        this.minersElements = [];

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <style>
            .bold {
                font-weight: bold;
            }
        </style>
        <div id="total">Total hashrate all rigs <span class="bold">0 H/s</span></div>`;
    }
    static get observedAttributes() {return ['miners','config']; }

    connectedCallback() {
        console.log("connected");
        this.minersDiv = this.shadowRoot.querySelector('#miners');
        this.totalDiv = this.shadowRoot.querySelector('#total');
        this.update();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        try {
            var obj = JSON.parse(newValue);
            if (attributeName === 'miners') {
                this.miners = obj;
                this.update();
            } else if (attributeName === 'config') {
                this.config = obj;
                this.updateConfig();
            }
        } catch (e) {
            console.log(newValue);
        }
    }

    updateConfig() {
        if (this.config.rigs) {
            this.removeOldMiners();
            for(var r in this.config.rigs) {
                if(this.config.rigs.hasOwnProperty(r)) {
                    let rig = this.config.rigs[r];
                    if (rig.miners && Array.isArray(rig.miners)) {
                        for(var i=0; i<rig.miners.length; i++) {
                            var minerConf = rig.miners[i];
                            console.log(`rig ${r}-${minerConf.no} ${minerConf.type}`);
                            var minerId = `${r}-${minerConf.no}`;
                            minerConf.id = minerId;
                            this.createMinerElement(minerId, minerConf);
                        }
                    }
                }
            }
        }
    }

    removeOldMiners() {
        this.minersElements.forEach(function (miner) {
            miner.element.remove();
        });
        this.minersElements = [];
    }

    createMinerElement(minerId, minerConf) {
        let newEl = document.createElement('rig-miner');
        var elObj = {
            id: minerId,
            element: newEl
        };
        this.minersElements.push(elObj);
        newEl.setAttribute('config', JSON.stringify(minerConf));
        this.shadowRoot.prepend(newEl);
    }

    update() {
        if (!this.miners || this.miners.length===0) {
            return;
        }
        var totalAll = {
            hashRate: 0,
            unit: "H/s"
        };
        for(var i=0; i<this.miners.length; i++) {
            var miner = this.miners[i];
            totalAll.hashRate += parseInt(miner.total.hashRate);
            var elo = this.minersElements.find(function(e) { return e.id === miner.id; }); // jshint ignore:line
            if (elo) {
                var el = elo.element;
                el.setAttribute('miner', JSON.stringify(miner));
            }
        }
        this.totalDiv.innerHTML = `Total hashrate all rigs <span class="bold">${totalAll.hashRate} ${totalAll.unit}</span>`;
    }
}
customElements.define('my-miners', Miners); // jshint ignore:line
