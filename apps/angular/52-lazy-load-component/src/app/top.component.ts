import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-top',
    template: `
        I am a very heavy, expensive component that should be lazy loaded.
    `,
    styles: `
        :host {
            display: grid;
            padding: 20px;
            background-color: #f0f0f0;
            height: 50%;
        }
    `,
})
export class TopComponent implements OnInit {
    ngOnInit(): void {
        console.log(TopComponent.name, this.ngOnInit.name);
    }
}
