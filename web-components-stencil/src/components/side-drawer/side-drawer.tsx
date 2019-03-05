import { Component } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    scoped: true
})
export class SideDrawer {
    render() {
        return (
            <aside>
                <h1>The Side Drawer</h1>
            </aside>
        );
    }
}
