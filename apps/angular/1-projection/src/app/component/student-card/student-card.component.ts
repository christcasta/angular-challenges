import { NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import {
    FakeHttpService,
    randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
    selector: 'app-student-card',
    template: `
        <ng-template #studentTemplate let-item="item">
            {{ item.id }} {{ item.firstName }}
            <button (click)="students.deleteOne(item.id)">
                <img class="h-5" src="assets/svg/trash.svg" />
            </button>
        </ng-template>
        <app-card
            [store]="students"
            [randItem]="randStudent"
            customClass="bg-light-green"
            [temp]="studentTemplate">
            <img
                ngSrc="assets/img/student.webp"
                width="200"
                height="200"
                image-content />
        </app-card>
    `,
    styles: [
        `
            ::ng-deep .bg-light-green {
                background-color: rgba(0, 250, 0, 0.1);
            }
        `,
    ],
    imports: [CardComponent, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
    private http = inject(FakeHttpService);
    private store = inject(StudentStore);

    randStudent = randStudent;
    students = this.store;

    ngOnInit(): void {
        this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    }
}
