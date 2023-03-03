import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { IG6GraphEvent, NodeConfig } from '@antv/g6';
import { G6Item, itemKeys } from './item';

const nodeKeys = [
  'id', 'groupId', 'comboId',
  'description', 'descriptionCfg', 'img', 'innerR',
  'direction', 'preRect', 'logoIcon', 'icon', 'stateIcon',
  'linkPoints', 'clipCfg'
] as const;

@Directive({ selector: 'g6-node' })
export class G6Node extends G6Item<NodeConfig> {
  protected readonly keys = [ ...itemKeys, ...nodeKeys ];
  @Input() id: string = `node_${Math.random().toString(36).substr(2, 9)}`;
  @Input() groupId?: string;
  @Input() comboId?: string;
  @Input() description?: string;
  @Input() descriptionCfg?: NodeConfig['descriptionCfg'];
  @Input() img?: string;
  @Input() innerR?: number;
  @Input() direction?: string;
  @Input() preRect?: NodeConfig['preRect'];
  @Input() logoIcon?: NodeConfig['logoIcon'];
  @Input() icon?: NodeConfig['icon'];
  @Input() stateIcon?: NodeConfig['stateIcon'];
  @Input() linkPoints?: NodeConfig['linkPoints'];
  @Input() clipCfg?: NodeConfig['clipCfg'];

  @Output() drag = new EventEmitter<IG6GraphEvent>();
  @Output() dragstart = new EventEmitter<IG6GraphEvent>();
  @Output() dragend = new EventEmitter<IG6GraphEvent>();
  @Output() dragleave = new EventEmitter<IG6GraphEvent>();
  @Output() drop = new EventEmitter<IG6GraphEvent>();

}
