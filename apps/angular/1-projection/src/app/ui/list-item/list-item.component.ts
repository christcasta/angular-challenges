import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    input,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { Store } from '../../data-access/store';

@Component({
    selector: 'app-list-item',
    template: `
        <div class="border-grey-300 flex justify-between border px-2 py-1">
            <ng-container
                [ngTemplateOutlet]="temp()"
                [ngTemplateOutletContext]="{ item: item() }"></ng-container>
        </div>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
})
export class ListItemComponent<T> implements OnInit {
    readonly store = input.required<Store<T>>();
    readonly temp = input.required<TemplateRef<unknown>>();
    readonly item = input.required<unknown>({});
    delete(id: number) {
        this.store().deleteOne(id);
    }
    ngOnInit(): void {
        console.log(this.item());
    }
}
