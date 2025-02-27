import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    //changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-person',
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
    template: `
        <div MatListItemLine class="flex justify-between" cd-flash>
            <h3 title="Name">
                {{ name() }}
            </h3>
        </div>
    `,
    host: {
        class: 'w-full flex flex-col items-center',
    },
})
export class PersonComponent {
    name = input.required<string>();
}
