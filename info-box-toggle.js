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
        this.button = this.shadowRoot.querySelector('button');
        this.infoEl = this.shadowRoot.querySelector('p');

        this.button.addEventListener('click', this._toggleInfoBoxVisibility.bind(this));
    }

    isHidden() {
        return this.hasAttribute('isHidden');
    }

    _toggleInfoBoxVisibility() {
        if (this.isHidden()) {
            this._showInfoBox();
        } else {
            this._hideInfoBox();
        }
    }

    _showInfoBox() {
        this.infoEl.style.display = 'block';
        this.button.textContent = 'Hide';
        this.removeAttribute('isHidden');
    }

    _hideInfoBox() {
        this.infoEl.style.display = 'none';
        this.button.textContent = 'Show';
        this.setAttribute('isHidden', '');
    }
}

customElements.define('codecartel-info-box-toggle', InfoBoxToggle);
