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
        minersDiv.innerHTML = `<p>${this.miner.id} - ${this.miner.version} - running for ${this.miner.uptime} 
        total ${this.miner.totalHash} - on ${this.miner.miningPool}</p>
        <p>${this.miner.detailHash}<br>${this.miner.tempSpeed}<br/>${this.miner.invalidShares}</p>`;
    }
}
customElements.define('rig-miner', Miner); // jshint ignore:line
