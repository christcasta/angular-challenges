import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { Store } from '../../data-access/store';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
    selector: 'app-card',
    template: `
        <div
            class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
            [class]="customClass()">
            <ng-content select="[image-content]"></ng-content>
            <section>
                @for (item of store().all(); track item) {
                    <app-list-item
                        [item]="item"
                        [store]="store()"
                        [temp]="temp()"></app-list-item>
                }
            </section>

            <button
                class="rounded-sm border border-blue-500 bg-blue-300 p-2"
                (click)="addNewItem()">
                Add
            </button>
        </div>
    `,
    imports: [ListItemComponent, CommonModule],
})
export class CardComponent<T> {
    readonly customClass = input('');
    readonly store = input.required<Store<T>>();
    readonly randItem = input.required<() => T>();
    readonly temp = input.required<TemplateRef<unknown>>();

    addNewItem() {
        this.store().addOne(this.randItem()());
    }
}
