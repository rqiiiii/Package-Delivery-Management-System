import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kgtog',
  standalone: true
})
export class KgtogPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    return value*1000;
  }

}
