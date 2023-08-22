import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allUserSearch'
})
export class AllUserSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      return it.custName.toLowerCase().includes(searchText.toLowerCase())
        // || it.petCount.toLowerCase().includes(searchText)
        || it.custMob.toLowerCase().includes(searchText)
        || it.customerId.toLowerCase().includes(searchText)
      // || it.certiCount.toLowerCase().includes(searchText)
    });

  }

}
