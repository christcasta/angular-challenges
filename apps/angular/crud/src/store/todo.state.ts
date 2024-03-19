import { Todo } from './todo.model';

export interface TodoState {
  todos: Todo[];
  loadingArr: boolean[];
  globalLoading: boolean | null;
  errorArr: string[];
  globalError: string;
}
export const initialState: TodoState = {
  todos: [],
  loadingArr: [],
  globalLoading: null,
  errorArr: [],
  globalError: '',
};
