import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    FakeHttpService,
    randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
    selector: 'app-teacher-card',
    template: `
        <ng-template let-item="item" #teacherTemplate>
            {{ item.id }} {{ item.firstName }}
            <button (click)="teachers.deleteOne(item.id)">
                <img class="h-5" src="assets/svg/trash.svg" />
            </button>
        </ng-template>
        <app-card
            [store]="teachers"
            [randItem]="randTeacher"
            customClass="bg-light-green"
            [temp]="teacherTemplate">
            <img
                ngSrc="assets/img/teacher.png"
                width="200"
                height="200"
                image-content />
        </app-card>
    `,
    styles: [
        `
            ::ng-deep .bg-light-red {
                background-color: rgba(250, 0, 0, 0.1);
            }
        `,
    ],
    imports: [CardComponent, NgOptimizedImage],
})
export class TeacherCardComponent implements OnInit {
    private http = inject(FakeHttpService);
    private store = inject(TeacherStore);

    teachers = this.store;
    randTeacher = randTeacher;
    ngOnInit(): void {
        this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    }
}
