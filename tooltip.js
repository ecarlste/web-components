class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log('It is working!');
    }
}

customElements.define('codecartel-tooltip', Tooltip);
