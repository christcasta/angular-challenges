import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  ROOT_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) errorMessage = `error occured : ${error.message}`;
    else
      errorMessage = `Backend returned code ${error.status} : ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.ROOT_URL}/todos`)
      .pipe(catchError(this.handleError));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${this.ROOT_URL}/todos/${todo.id}`,
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
    );
  }
}
