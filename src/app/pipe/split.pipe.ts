import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, sign: string, index: number): string {
    return value.split(sign)[index];
  }

}
