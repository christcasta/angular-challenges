import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';
import { Store } from './store';

@Injectable({
    providedIn: 'root',
})
export class CityStore implements Store<City> {
    public all = signal<City[]>([]);

    addAll(cities: City[]) {
        this.all.set(cities);
    }

    addOne(student: City) {
        this.all.set([...this.all(), student]);
    }

    deleteOne(id: number) {
        this.all.set(this.all().filter((s) => s.id !== id));
    }
}
