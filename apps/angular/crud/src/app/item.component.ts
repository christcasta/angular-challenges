import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from './services/todo/todo';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="updateItem(todo)">Update</button>
      <button (click)="deleteItem(todo)">Delete</button>
      {{ todo.title }}
    </div>
  `,
  styles: [],
})
export class ItemComponent {
  @Input() todo!: Todo;
  @Output() newUpdateItemEvent = new EventEmitter<Todo>();
  @Output() newDeleteItemEvent = new EventEmitter<Todo>();

  updateItem(todo: Todo) {
    this.newUpdateItemEvent.emit(todo);
  }

  deleteItem(todo: Todo) {
    this.newDeleteItemEvent.emit(todo);
  }
}
