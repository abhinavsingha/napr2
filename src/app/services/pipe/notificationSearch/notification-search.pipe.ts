import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationSearch'
})
export class NotificationSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      return it.descr.toLowerCase().includes(searchText.toLowerCase())
    });

  }

}
