import { WritableSignal } from '@angular/core';

export interface Store<T> {
    all: WritableSignal<T[]>;
    addAll(eltArr: T[]): void;
    addOne(elt: T): void;
    deleteOne(id: number): void;
}
