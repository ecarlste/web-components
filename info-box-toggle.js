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
            <p><slot></slot></p>
        `;
    }

    connectedCallback() {
        this._button = this.shadowRoot.querySelector('button');
        this._infoEl = this.shadowRoot.querySelector('p');

        this._button.addEventListener('click', this._toggleInfoBoxVisibility.bind(this));
    }

    isHidden() {
        return this.hasAttribute('is-hidden');
    }

    _toggleInfoBoxVisibility() {
        if (this.isHidden()) {
            this._showInfoBox();
        } else {
            this._hideInfoBox();
        }
    }

    _showInfoBox() {
        this._infoEl.style.display = 'block';
        this._button.textContent = 'Hide';
        this.removeAttribute('is-hidden');
    }

    _hideInfoBox() {
        this._infoEl.style.display = 'none';
        this._button.textContent = 'Show';
        this.setAttribute('is-hidden', '');
    }
}

customElements.define('codecartel-info-box-toggle', InfoBoxToggle);
