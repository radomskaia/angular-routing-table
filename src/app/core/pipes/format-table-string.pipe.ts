import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { NetworkRoute } from '../models/network-route.model';
import type { SortOrder } from '../types/sort.types';
import { getPrefixLength } from '../../shared/utils/ip-utilities';

@Pipe({
  name: 'formatTableString',
  standalone: true,
})
export class FormatTableStringPipe implements PipeTransform {
  public transform(route: NetworkRoute, key: SortOrder): string {
    if (key !== 'address') {
      return route[key];
    }
    const maskLength = getPrefixLength(route.mask);
    if (maskLength) {
      return `${route.address}/${maskLength}`;
    }
    return route.address;
  }
}
