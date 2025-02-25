import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { map } from 'rxjs';

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    state: 'disable' | 'idle';
}
export interface DataState {
    todos: Todo[];
    error: string;
    state: 'loading' | 'loaded' | 'error';
}
@Injectable({
    providedIn: 'root',
})
export class AppService {
    _data = signal<DataState>({
        todos: [],
        error: '',
        state: 'loading',
    });
    private url = 'https://jsonplaceholder.typicode.com/todos';
    http = inject(HttpClient);
    constructor() {
        this._getData();
    }
    _getData() {
        console.log(this._data());
        this.http
            .get<Todo[]>(`${this.url}`)
            .pipe(
                map((d) =>
                    this._data.set({
                        todos: <Todo[]>d,
                        error: '',
                        state: 'loaded',
                    }),
                ),
            )
            .subscribe();
    }

    _disableTodo(todo: Todo) {
        this._data.update((dataUpdate) => ({
            error: dataUpdate.error,
            state: dataUpdate.state,
            todos: [...dataUpdate.todos].map((elt) => {
                if (elt.id == todo.id) elt.state = 'disable';
                return elt;
            }),
        }));
    }

    getData() {
        return this._data.asReadonly();
    }

    updateTodo(todo: Todo) {
        this._disableTodo(todo);
        this.http
            .put<Todo>(
                `${this.url}/${todo.id}`,
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
            .pipe(
                map((res: Todo) => {
                    this._data.update((dataState) => {
                        dataState.todos = [...dataState.todos].map((elt) =>
                            elt.id == res.id ? res : elt,
                        );
                        return dataState;
                    });
                }),
            )
            .subscribe();
    }

    deleteTodo(todo: Todo) {
        this._disableTodo(todo);
        this.http
            .delete<Todo>(`${this.url}/${todo.id}`)
            .pipe(
                map((_) => {
                    this._data.update((dataState) => {
                        dataState.todos = [...dataState.todos].filter(
                            (elt) => elt.id != todo.id,
                        );
                        return dataState;
                    });
                }),
            )
            .subscribe();
    }
}
