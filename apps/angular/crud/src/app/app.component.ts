import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemComponent } from './item.component';
import { Todo } from './services/todo/todo';
import { TodoService } from './services/todo/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ItemComponent],
  selector: 'app-root',
  template: `
    <mat-progress-spinner
      mode="indeterminate"
      *ngIf="hasToShowSpinner"></mat-progress-spinner>
    <app-item
      *ngFor="let todo of todos"
      [todo]="todo"
      (newUpdateItemEvent)="update($event)"
      (newDeleteItemEvent)="delete($event)"></app-item>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];
  hasToShowSpinner: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.hasToShowSpinner = false;
      },
      error: (err) => alert(err),
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (todoUpdated) =>
        (this.todos = [
          ...this.todos.filter((it) => it.id < todoUpdated.id),
          todoUpdated,
          ...this.todos.filter((it) => it.id > todoUpdated.id),
        ]),
      error: (err) => alert(err),
    });
  }

  delete(todo: Todo) {
    this.todos = [
      ...this.todos.filter((it) => it.id < todo.id),
      ...this.todos.filter((it) => it.id > todo.id),
    ];
  }
}
