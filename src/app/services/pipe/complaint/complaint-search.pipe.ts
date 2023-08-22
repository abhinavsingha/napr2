import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complaintSearch'
})
export class ComplaintSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    return items.filter(it => {
      return it.ownerName.toLowerCase().includes(searchText.toLowerCase())
      || it.petName.toLowerCase().includes(searchText.toLowerCase())
      || it.petType.toLowerCase().includes(searchText.toLowerCase())
      || it.breed.toLowerCase().includes(searchText.toLowerCase())
      || it.address.toLowerCase().includes(searchText.toLowerCase())
      || it.reason.toLowerCase().includes(searchText.toLowerCase())
      || it.nameOfComplainer.toLowerCase().includes(searchText.toLowerCase())
      || it.detailsOfComplainer.toLowerCase().includes(searchText.toLowerCase())
      || it.createdOn.toLowerCase().includes(searchText)
      || it.complaintId.toLowerCase().includes(searchText)
    });

  }

}