class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = 'Default tooltip text...';
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0, 0, 0, .26);
                }

                :host {
                    position: relative;
                }

                :host(.important) {
                    background: var(--color-primary, #ccc);
                    padding: 0.15rem;
                }
                
                :host-context(p) {
                    font-weight: bold;
                }

                .hightlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                  }
      
                  .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                  }
            </style>
            <slot>Default slot value</slot>
            <span class="icon">?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this._tooltipIcon = this.shadowRoot.querySelector('span');

        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    }

    static get observedAttributes() {
        return ['text'];
    }

    _showTooltip = () => {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip = () => {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('codecartel-tooltip', Tooltip);
