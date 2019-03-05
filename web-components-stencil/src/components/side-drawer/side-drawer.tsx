import { Component, Prop } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    scoped: true
})
export class SideDrawer {
    @Prop() title: string;

    render() {
        return (
            <aside>
                <header><h1>{this.title}</h1></header>
                <main>
                    <slot />
                </main>
            </aside>
        );
    }
}
