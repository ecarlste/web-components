class InfoBoxToggle extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                p {
                    display: none;
                }
            </style>
            <button>Show</button>
            <p>More infos!</p>
        `;
    }

    connectedCallback() {
        this.button = this.shadowRoot.querySelector('button');
        this.infoEl = this.shadowRoot.querySelector('p');

        this.button.addEventListener('click', this._toggleInfoBoxVisibility.bind(this));

        this.isHidden = true;
    }

    _toggleInfoBoxVisibility() {
        if (this.isHidden) {
            this._showInfoBox();
        } else {
            this._hideInfoBox();
        }
    }

    _showInfoBox() {
        this.infoEl.style.display = 'block';
        this.button.textContent = 'Hide';
        this.isHidden = false;
    }

    _hideInfoBox() {
        this.infoEl.style.display = 'none';
        this.button.textContent = 'Show';
        this.isHidden = true;
    }
}

customElements.define('codecartel-info-box-toggle', InfoBoxToggle);
