import { Component, Prop, State, Method } from "@stencil/core";

@Component({
    tag: 'codecartel-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @State() showContactInfo = false;

    @Prop({ reflectToAttr: true }) headerTitle: string;
    @Prop({ reflectToAttr: true, mutable: true }) isOpen: boolean;
    
    render() {
        let mainContent = <slot />;

        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-info">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email.</p>
                    <ul>
                        <li>Phone: 4068675309</li>
                        <li>
                            E-Mail:{' '}
                            <a href="mailto:something@something.com">something@something.com</a>
                        </li>
                    </ul>
                </div>
            );
        }

        return ([
            <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
            <aside>
                <header>
                    <h1>{this.headerTitle}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button
                        class={this.showContactInfo ? '' : 'active'}
                        onClick={this.onContentChange.bind(this, 'nav')}
                    >
                        Navigation
                    </button>
                    <button
                        class={this.showContactInfo ? 'active' : ''}
                        onClick={this.onContentChange.bind(this, 'contact')}
                    >
                        Contact
                    </button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        ]);
    }

    onCloseDrawer() {
        this.isOpen = false;
    }

    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
    }

    @Method()
    open() {
        this.isOpen = true;
    }
}
