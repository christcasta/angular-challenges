import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class TeacherStore implements Store<Teacher> {
    public all = signal<Teacher[]>([]);

    addAll(all: Teacher[]) {
        this.all.set(all);
    }

    addOne(teacher: Teacher) {
        this.all.set([...this.all(), teacher]);
    }

    deleteOne(id: number) {
        this.all.set(this.all().filter((t) => t.id !== id));
    }
}
