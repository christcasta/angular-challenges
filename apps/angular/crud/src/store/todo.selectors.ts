import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';

export const selectTodoState = (state: TodoState) => state;

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => {
    return {
      todos: state.todos,
      globalError: state.globalError,
      globalLoading: state.globalLoading,
    };
  },
);
