import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { initialState } from './todo.state';

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    globalLoading: true,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    globalLoading: false,
    loadingArr: <boolean[]>Array(todos.length).fill(false),
    errorArr: <string[]>Array(todos.length).fill(''),
  })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    globalError: error,
    globalLoading: false,
  })),
  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    loadingArr: state.loadingArr.map((_, i) => i === todo.id - 1),
  })),
  on(TodoActions.updateTodoSucces, (state, { todo }) => ({
    ...state,
    loadingArr: state.loadingArr.map((val, i) =>
      i === todo.id - 1 ? true : val,
    ),
  })),
  on(TodoActions.updateTodoFailure, (state, { todo, error }) => ({
    ...state,
    loadingArr: state.loadingArr.map((val, i) =>
      i === todo.id - 1 ? true : val,
    ),
    errorArr: state.errorArr.map((val, i) => (i === todo.id - 1 ? error : val)),
  })),
  on(TodoActions.deleteTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.filter((it) => it.id !== todo.id),
    errorArr: state.errorArr.filter((_, i) => i !== todo.id - 1),
    loadingArr: state.loadingArr.filter((_, i) => i !== todo.id - 1),
  })),
);
