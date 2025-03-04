import { TitleCasePipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    numberAttribute,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';

@Component({
    selector: 'app-user',
    imports: [TitleCasePipe],
    template: `
        {{ fullName() | titlecase }} plays tennis in the
        {{ category() }} category!!
    `,
    host: {
        class: 'text-xl text-green-800',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    name = input.required<string>();
    lastName = input<string>();
    age = input<number, unknown>(0, { transform: numberAttribute });
    fullName = computed(() => {
        return `${this.name()} ${this.lastName() ?? ''}`;
    });
    category = computed(() => {
        if (this.age() < 10) return 'Youth';
        else if (this.age() < 18) return 'Junior';
        else if (this.age() < 35) return 'Open';
        return 'Senior';
    });
}
