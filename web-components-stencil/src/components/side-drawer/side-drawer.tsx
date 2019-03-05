import { Component, Prop } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflectToAttr: true }) headerTitle: string;
    @Prop() open: boolean;

    render() {
        let content = null;

        if (this.open) {
            content = (
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

        return content;
    }
}
