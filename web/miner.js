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
            .time {
                color: yellow;
                font-size: 80%;
            }
            .error {
                color: red;
            }
        </style>
        `;
    }
    static get observedAttributes() {return ['miner', 'config']; }
    connectedCallback() {
        console.log("connected");
    }

    // get miner() {
    //     return this.getAttribute('miner');
    // }
    // set miner(newValue) {
    //     this.setAttribute('miner', newValue);
    // }
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'config') {
            this.config = JSON.parse(newValue);
            this.updateConfig();
        } else if (attributeName === 'miner') {
            if (this.config && this.config.id) {
                fetch(`api/status/${this.config.id}`).then((res) => res.json()).then(m => {
                    this.miner = m;
                    this.update();
                });
            }
        }
    }
    update() {
        let minersDiv = this.shadowRoot.querySelector('#miner');
        let hashSpeedUnit = this.miner.hashSpeedUnit;
        let htmlString = this.configHtml;
        if (this.miner.state === "running") {
            htmlString += `<p>${this.miner.version} - ${this.miner.miningPool}<br/><span class="time">updated ${this.miner.lastUpdate} - running ${this.miner.uptime}</span></p>
            <p>total ${this.miner.total.hashRate} ${hashSpeedUnit} - ${this.miner.total.shares} shares - ${this.miner.total.rejected} rejected</p>
            <p>`;

            let counter = 0;
            this.miner.units.forEach(function(unit) {
                htmlString += `gpu${counter}: ${unit.hashRate} ${hashSpeedUnit} - temp ${unit.temperature} - ${unit.extraInfo}<br/>`;
                counter++;
            });
            htmlString += "</p>";
        } else {
            htmlString += `<p class="error">${this.miner.state} - last seen ${moment(this.miner.lastSeen).format("YYYY-MM-DD HH:mm:ss")}<br/><span class="time">updated ${this.miner.lastUpdate}</span></p>
            <p class="error"> ${this.miner.errorMsg}</p>`;
        }

        minersDiv.innerHTML = htmlString;
    }
    updateConfig() {
        let minersDiv = this.shadowRoot.querySelector('#miner');
        this.configHtml = `<p>${this.config.id} (${this.config.host}) - ${this.config.type}</p>`;
        minersDiv.innerHTML = this.configHtml;
    }
}
customElements.define('rig-miner', Miner); // jshint ignore:line
