import { createAction, emptyProps, props } from '@ngrx/store';
import { Todo } from './todo.model';

export const loadTodos = createAction('[Todo] Load Todos', emptyProps);
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>(),
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>(),
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>(),
);
export const updateTodoSucces = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>(),
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ todo: Todo; error: string }>(),
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ todo: Todo }>(),
);
