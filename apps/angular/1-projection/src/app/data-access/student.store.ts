import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class StudentStore implements Store<Student> {
    public all = signal<Student[]>([]);

    addAll(all: Student[]) {
        this.all.set(all);
    }

    addOne(student: Student) {
        this.all.set([...this.all(), student]);
    }

    deleteOne(id: number) {
        this.all.set(this.all().filter((s) => s.id !== id));
    }
}
