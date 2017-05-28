import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getDay' })
export class getDayPipe implements PipeTransform {
  transform(value: Date): number {
    if (!value) return null;
    console.log("value", value)
    console.log(value.getDate());
    return value.getDate();
  }
}