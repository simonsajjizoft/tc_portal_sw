import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

  transform(value: string[], q: string) {
    if (!q || q === '') {
        return value;
    }
    return value.filter(item => -1 < item.toLowerCase().indexOf(q.toLowerCase()));
}

}
