import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {
    transform(value: number): number {
        if (value === 1 || value === 2) {
            return 1;
        }
        return this.transform(value - 1) + this.transform(value - 2);
    }
}
