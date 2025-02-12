import { NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
    FakeHttpService,
    randomCity,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';

@Component({
    selector: 'app-city-card',
    template: `
        <ng-template #cityTemplate let-item="item">
            {{ item.id }} {{ item.name }} {{ item.country }}
            <button (click)="cities.deleteOne(item.id)">
                <img class="h-5" src="assets/svg/trash.svg" />
            </button>
        </ng-template>
        <app-card
            [store]="cities"
            [randItem]="randomCity"
            customClass="bg-light-green"
            [temp]="cityTemplate">
            <img
                ngSrc="assets/img/city.png"
                width="200"
                height="200"
                image-content />
        </app-card>
    `,
    imports: [CardComponent, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
    private http = inject(FakeHttpService);
    private store = inject(CityStore);

    randomCity = randomCity;
    cities = this.store;

    ngOnInit(): void {
        this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
    }
}
