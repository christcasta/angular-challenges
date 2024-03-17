import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos!: Todo[];

  constructor(private http: HttpClient) {}
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe();
  }
  updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .pipe();
  }
}
