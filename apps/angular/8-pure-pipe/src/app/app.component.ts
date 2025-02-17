import { Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
    imports: [HeavyComputationPipe],
    selector: 'app-root',
    template: `
        @for (person of persons; track person) {
            <div>
                {{ person | heavyComputation: persons.indexOf(person) }}
            </div>
        }
    `,
})
export class AppComponent {
    persons = ['toto', 'jack'];
}
