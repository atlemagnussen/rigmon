/* miners components*/
"use strict";

class Miners extends HTMLElement {
    constructor() {
        super();
        this.miners = [];
        this.minersElements = [];

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
        <div id="miners">
        </div>
        `;
    }
    static get observedAttributes() {return ['miners']; }

    connectedCallback() {
        console.log("connected");
        this.minersDiv = this.shadowRoot.querySelector('#miners');
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
        for(var i=0; i<this.miners.length; i++) {
            var miner = this.miners[i];
            var elo = this.minersElements.find(function(e) { return e.id === miner.id; }); // jshint ignore:line
            if (!elo) {
                let newEl = document.createElement('rig-miner');
                var elObj = {
                    id: miner.id,
                    element: newEl
                };
                this.minersElements.push(elObj);
                newEl.setAttribute('miner', JSON.stringify(miner));
                this.minersDiv.appendChild(newEl);
            } else {
                var el = elo.element;
                el.setAttribute('miner', JSON.stringify(miner));
            }
        }

    }
}
customElements.define('my-miners', Miners); // jshint ignore:line
