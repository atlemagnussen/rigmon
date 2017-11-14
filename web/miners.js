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
    static get observedAttributes() {return ['miners']; }

    connectedCallback() {
        console.log("connected");
        this.minersDiv = this.shadowRoot.querySelector('#miners');
        this.totalDiv = this.shadowRoot.querySelector('#total');
        this.update();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'miners') {
            try {
                var obj = JSON.parse(newValue);
                this.miners = obj;
                this.update();
            } catch (e) {
                console.log(newValue);
            }

        }
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
            if (!elo) {
                let newEl = document.createElement('rig-miner');
                var elObj = {
                    id: miner.id,
                    element: newEl
                };
                this.minersElements.push(elObj);
                newEl.setAttribute('miner', JSON.stringify(miner));
                this.shadowRoot.prepend(newEl);
            } else {
                var el = elo.element;
                el.setAttribute('miner', JSON.stringify(miner));
            }
        }
        this.totalDiv.innerHTML = `Total hashrate all rigs <span class="bold">${totalAll.hashRate} ${totalAll.unit}</span>`;
    }
}
customElements.define('my-miners', Miners); // jshint ignore:line
