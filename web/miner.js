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
        <style>
            #miner {
                border-style: ridge;
                padding: 5px;
                margin: 5px;
            }
        </style>
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
        let hashSpeedUnit = this.miner.hashSpeedUnit;
        let htmlString = `
        <p>${this.miner.id} - ${this.miner.version} - ${this.miner.miningPool} - running for ${this.miner.uptime}</p>
        <p>total ${this.miner.total.hashRate}${hashSpeedUnit} - ${this.miner.total.shares} shares where ${this.miner.total.rejected} rejected</p>
        <p>`;
        let counter = 0;
        this.miner.units.forEach(function(unit) {
            htmlString += `gpu${counter}: ${unit.hashRate}${hashSpeedUnit} - temp ${unit.temperature} - ${unit.extraInfo}<br/>`;
            counter++;
        });
        htmlString += "</p>";
        minersDiv.innerHTML = htmlString;
    }
}
customElements.define('rig-miner', Miner); // jshint ignore:line
