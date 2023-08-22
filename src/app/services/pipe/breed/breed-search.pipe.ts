import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breedSearch'
})
export class BreedSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      return it.breedName.toLowerCase().includes(searchText.toLowerCase())
        || it.petName.toLowerCase().includes(searchText.toLowerCase())
    });

  }

}
