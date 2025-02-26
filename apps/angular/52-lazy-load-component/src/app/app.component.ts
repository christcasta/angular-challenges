import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
    selector: 'app-root',
    template: `
        <div class="h-screen bg-gray-500">
            @defer (when isClicked) {
                <app-top />
            } @placeholder {
                <app-placeholder />
                <button
                    class="rounded-sm border border-blue-500 bg-blue-300 p-2"
                    (click)="onClick()">
                    Load Top
                </button>
            }
        </div>
    `,
    imports: [PlaceholderComponent, TopComponent],
})
export class AppComponent {
    isClicked = false;
    onClick() {
        this.isClicked = !this.isClicked;
        console.log(AppComponent.name, this.onClick.name, this.isClicked);
    }
}
