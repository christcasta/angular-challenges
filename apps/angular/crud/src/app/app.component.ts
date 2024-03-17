import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from './services/todo/todo';
import { TodoService } from './services/todo/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  update(todo: Todo) {
    this.todoService
      .updateTodo(todo)
      .subscribe(
        (todoUpdated) =>
          (this.todos = [
            ...this.todos.filter((it) => it.id < todoUpdated.id),
            todoUpdated,
            ...this.todos.filter((it) => it.id > todoUpdated.id),
          ]),
      );
  }

  delete(todo: Todo) {
    this.todos = [
      ...this.todos.filter((it) => it.id < todo.id),
      ...this.todos.filter((it) => it.id > todo.id),
    ];
  }
}
