import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailListSearchPipe'
})
export class MailListSearchPipePipe implements PipeTransform {

  //transform(value: unknown, ...args: unknown[]): unknown {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    return items.filter(it => {
      return it.custName.toLowerCase().includes(searchText.toLowerCase())
        || it.petName.toLowerCase().includes(searchText.toLowerCase())
        || it.address.toLowerCase().includes(searchText)
        || it.amount.includes(searchText)
        || it.date.includes(searchText)
        || it.formId.includes(searchText)
    });

  }

}
