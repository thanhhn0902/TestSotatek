import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false,
})

export class FilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value == null) {
            return null;
        }
        if (typeof args === 'boolean') {
            return value.sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        }

        let key = Object.keys(args)[0];
        return value.filter((todo: any) => !todo[key]);
    }
}