import { Component, Prop } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflectToAttr: true }) headerTitle: string;
    
    render() {
        return (
            <aside>
                <header>
                    <h1>{this.headerTitle}</h1>
                </header>
                <main>
                    <slot />
                </main>
            </aside>
        );
    }
}
