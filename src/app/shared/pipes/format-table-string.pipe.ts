import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { SortOrder } from '../types/sort.types';
import { getPrefixLength } from '../utils/ip-utilities';
import type { NetworkRoute } from '../../core/models/network-route.model';

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
