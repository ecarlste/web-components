import { Component, Prop } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflectToAttr: true }) headerTitle: string;
    @Prop({ reflectToAttr: true, mutable: true }) isOpen: boolean;
    
    render() {
        return (
            <aside>
                <header>
                    <h1>{this.headerTitle}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <main>
                    <slot />
                </main>
            </aside>
        );
    }

    onCloseDrawer() {
        this.isOpen = false;
    }
}
