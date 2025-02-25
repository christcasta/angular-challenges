import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    Signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService, DataState, Todo } from './app.service';

@Component({
    imports: [CommonModule, MatProgressSpinnerModule],
    selector: 'app-root',
    template: `
        @switch (todos().state) {
            @case ('loading') {
                <mat-spinner></mat-spinner>
            }
            @case ('loaded') {
                @for (todo of todos().todos; track todo.id) {
                    <div>
                        {{ todo.title }}
                        <span>&nbsp;</span>
                        <button
                            (click)="update(todo)"
                            [disabled]="todo.state == 'disable'">
                            Update
                        </button>
                        <span>&nbsp;</span>
                        <button
                            (click)="delete(todo)"
                            [disabled]="todo.state == 'disable'">
                            Delete
                        </button>
                    </div>
                }
            }
        }
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    todos: Signal<DataState>;
    service = inject(AppService);
    constructor() {
        this.todos = <Signal<DataState>>{};
    }
    ngOnInit(): void {
        this.todos = this.service.getData();
    }
    update(todo: Todo) {
        this.service.updateTodo(todo);
    }

    delete(todo: Todo) {
        this.service.deleteTodo(todo);
    }
}
