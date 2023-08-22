import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sectorSearch'
})
export class SectorSearchPipe implements PipeTransform {

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
