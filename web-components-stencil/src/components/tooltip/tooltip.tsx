import { Component } from "@stencil/core";

@Component({
  tag: 'codecartel-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})
export class Tooltip {
  render() {
    return ([
      <slot>Default slot value</slot>,
      <span class="icon">?</span>
    ]);
  }
}