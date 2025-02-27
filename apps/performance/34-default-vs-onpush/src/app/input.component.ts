import { Component, input, output } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    //changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-input',
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        CDFlashingDirective,
    ],
    template: `
        <h1 cd-flash class="text-center font-semibold" title="Title">
            {{ title() | titlecase }}
        </h1>
        <mat-form-field class="w-4/5" cd-flash>
            <input
                placeholder="Add one member to the list"
                matInput
                type="text"
                [(ngModel)]="label"
                (keydown)="addUser($event)" />
        </mat-form-field>
    `,
    host: {
        class: 'w-full flex flex-col items-center',
    },
})
export class InputComponent {
    title = input.required<string>();
    onAddUser = output<string>();
    label = '';
    addUser($event: KeyboardEvent) {
        if ($event.key === 'Enter') {
            this.onAddUser.emit(this.label);
            this.label = '';
        }
    }
}
