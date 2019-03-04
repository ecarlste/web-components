class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Default tooltip text...';
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.addEventListener('mouseenter', this._showTooltip.bind(this));
        
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?) ';
        this.appendChild(tooltipIcon);
    }

    _showTooltip = () => {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip = () => {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('codecartel-tooltip', Tooltip);
