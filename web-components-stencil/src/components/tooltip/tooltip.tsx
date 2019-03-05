import { Component, Prop } from "@stencil/core";

@Component({
  tag: 'codecartel-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})
export class Tooltip {
  @Prop({ reflectToAttr: true, mutable: true }) isHidden = true;
  @Prop({ reflectToAttr: true }) tooltipText: string;

  render() {
    return ([
      <div class="container">
        <div>
          <slot>Default slot value</slot>
        </div>    
        <div class="tooltip">
          <span class="icon" onClick={this._toggleTooltip.bind(this)}>?</span>
          <div class="tooltip-text">{this.tooltipText || 'Default tooltip text'}</div>
        </div>
      </div>
    ]);
  }

  _toggleTooltip() {
    this.isHidden ? this.showTooltip() : this.hideTooltip();
  }

  showTooltip() {
    this.isHidden = false;
  }

  hideTooltip() {
    this.isHidden = true;
  }
}