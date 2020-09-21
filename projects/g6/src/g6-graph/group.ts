import { Directive, Input } from '@angular/core';
import { GroupConfig } from '@antv/g6/lib/types';
import { G6Item, itemKeys } from './item';

const groupKeys = [
  'id', 'parentId'
] as const;

@Directive({ selector: 'g6-group' })
export class G6Group extends G6Item<GroupConfig> {
  protected readonly keys = [ ...itemKeys, ...groupKeys ];
  @Input() id: string = `group_${Math.random().toString(36).substr(2, 9)}`;
  @Input() parentId?: string;
}
