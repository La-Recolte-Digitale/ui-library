import { Injectable } from '@angular/core';

@Injectable()
export class StringHelpersService {

  search(items: any[], query: string, mapper: Function) {
    return items.filter(item =>
      mapper(item) && this.normalizeStr(mapper(item)).includes(this.normalizeStr(query))
    );
  }

  sort(items: any[], mapper: Function) {
    return items.sort((a, b) => this.normalizeStr(mapper(a)) < this.normalizeStr(mapper(b)) ? -1 : 
      (this.normalizeStr(mapper(a)) === this.normalizeStr(mapper(b)) ? 0 : 1));
  }

  normalizeStr(str: string) {
    return str && str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
}
