import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedUp',
  standalone: true,
})
export class SpeedUpPipe implements PipeTransform {

  transform(value: [number, number] | null): any {
    const [prev = 0, curr = 0] = value || [];
    if (prev < curr) {
      return `${prev} increases to ${curr}`;
    } else if (prev > curr) {
      return `${prev} reduces to ${curr}`;
    }
    return 'same speed';
  }
}
