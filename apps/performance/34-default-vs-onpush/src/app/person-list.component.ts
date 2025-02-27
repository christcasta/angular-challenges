import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { InputComponent } from './input.component';
import { PersonComponent } from './person.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-person-list',
    imports: [
        CommonModule,
        MatListModule,
        CDFlashingDirective,
        InputComponent,
        PersonComponent,
    ],
    template: `
        <app-input
            [title]="title"
            (onAddUser)="handleAddUser($event)"></app-input>

        <mat-list class="flex w-full">
            <div *ngIf="names?.length === 0" class="empty-list-label">
                Empty list
            </div>
            <mat-list-item *ngFor="let name of names" class="text-orange-500">
                <app-person [name]="name"></app-person>
            </mat-list-item>
            <mat-divider *ngIf="names?.length !== 0"></mat-divider>
        </mat-list>
    `,
    host: {
        class: 'w-full flex flex-col items-center',
    },
})
export class PersonListComponent {
    @Input() names: string[] = [];
    @Input() title = '';

    label = '';

    handleAddUser($event: string) {
        this.names?.unshift($event);
    }
}
