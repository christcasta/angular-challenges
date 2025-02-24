/* eslint-disable @angular-eslint/component-selector */
import { ViewportScroller } from '@angular/common';
import { Component, inject, input } from '@angular/core';
@Component({
    selector: 'nav-button',
    standalone: true,
    template: `
        <a routerLink="routerLink" fragment="fragment" class="active">
            <ng-content></ng-content>
        </a>
    `,
    host: {
        class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
    },
})
export class NavButtonComponent {
    routerLink = input.required<string>();
    fragment = input('');
    scroller = inject(ViewportScroller);
    onClickScrollSmooth(elementId: string) {
        this.scroller.scrollToAnchor(elementId);
    }
}
