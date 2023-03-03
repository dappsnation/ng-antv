import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ComboConfig, ComboTree, IG6GraphEvent } from '@antv/g6';
import { G6Item, itemKeys } from './item';

const comboKeys = [ 'id', 'parentId', 'children', 'depth', 'padding', 'collapseIcon' ] as const;

@Directive({ selector: 'g6-combo' })
export class G6Combo extends G6Item<ComboConfig> {
  protected readonly keys = [ ...itemKeys, ...comboKeys ];
  @Input() id: string = `combo_${Math.random().toString(36).substr(2, 9)}`;
  @Input() parentId?: string;
  @Input() children?: ComboTree[];
  @Input() depth?: number;
  @Input() padding?: number | number[];
  @Input() collapseIcon?: ComboConfig['collapseIcon']

  @Output() drag = new EventEmitter<IG6GraphEvent>();
  @Output() dragstart = new EventEmitter<IG6GraphEvent>();
  @Output() dragend = new EventEmitter<IG6GraphEvent>();
  @Output() dragleave = new EventEmitter<IG6GraphEvent>();
  @Output() drop = new EventEmitter<IG6GraphEvent>();

}
