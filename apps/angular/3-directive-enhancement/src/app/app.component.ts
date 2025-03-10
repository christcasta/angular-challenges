import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Person {
    name: string;
}

@Component({
    imports: [NgFor, NgIf],
    selector: 'app-root',
    template: `
        @for (person of persons; track person.name) {
            <div>
                {{ person.name }}
            </div>
        } @empty {
            <div>The list is empty !!</div>
        }
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    persons: Person[] = [];
}
