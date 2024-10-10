import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper',
  standalone: true
})
export class UpperPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
    if (!value) return ''; // Check if the value is null or undefined
    return value.toUpperCase(); // Convert the value to uppercase
  }

}
