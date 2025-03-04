import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@Component({
    imports: [FormsModule],
    selector: 'app-actions',
    template: `
        <form class="mx-auto max-w-sm">
            <label
                for="actions"
                class="mb-2 block text-sm font-medium text-gray-900">
                Choose an action
            </label>
            <select
                name="actions"
                [(ngModel)]="action"
                id="actions"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
                <option selected>{{ helperText }}</option>
                @for (action of actions; track $index) {
                    <option value="{{ action }}">{{ action }}</option>
                }
            </select>
        </form>
        {{ log() }}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
    private userService = inject(UserService);
    helperText = 'Please select an action';
    protected action = signal(undefined);
    protected actions = ['Create', 'Read', 'Update', 'Delete'];

    log = computed(() => {
        if (this.action() && this.action() != this.helperText)
            this.userService.log(this.action() ?? 'No action selected');
    });
}
