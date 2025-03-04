import {
    ChangeDetectionStrategy,
    Component,
    computed,
    model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    imports: [FormsModule],
    selector: 'app-root',
    template: `
        <section class="flex gap-5">
            <p>MacBook</p>
            <p>1999,99 €</p>
        </section>

        <section>
            <p>Extras:</p>

            <div>
                <input type="checkbox" [(ngModel)]="drive" />
                +500 GB drive-space
            </div>
            <div>
                <input type="checkbox" [(ngModel)]="ram" />
                +4 GB RAM
            </div>
            <div>
                <input type="checkbox" [(ngModel)]="gpu" />
                Better GPU
            </div>
        </section>
        {{ isDisplayAlert() }}
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    drive = model(false);
    ram = model(false);
    gpu = model(false);
    state = {
        drive: this.drive(),
        gpu: this.gpu(),
        ram: this.ram(),
    };
    isDisplayAlert = computed(() => {
        if (
            (this.drive() && !this.state.drive) ||
            (this.ram() && !this.state.ram) ||
            (this.gpu() && !this.state.gpu)
        )
            alert('Price increased !');
        this.state = {
            drive: this.drive(),
            gpu: this.gpu(),
            ram: this.ram(),
        };
    });
}
