/* miner component */
"use strict";

class Miner extends HTMLElement {
    constructor() {
        super();
        this.miner = {"id": "nul"};

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <div id="miner">
        </div>
        `;
    }
    static get observedAttributes() {return ['miner']; }
    connectedCallback() {
        console.log("connected");
        this.update();

        // this.appendChild(this.paragraph);
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'miner') {
            this.miner = JSON.parse(newValue);
        }
        this.update();
    }
    update() {
        let minersDiv = this.shadowRoot.querySelector('#miner');
        let unit = this.miner.unit;
        minersDiv.innerHTML = `
        <p>${this.miner.id} - ${this.miner.version} - ${this.miner.miningPool} - running for ${this.miner.uptime}</p>
        <p>total ${this.miner.total.hashRate}${unit} - ${this.miner.total.shares} shares where ${this.miner.total.rejected} rejected</p>`;
    }
}
customElements.define('rig-miner', Miner); // jshint ignore:line
