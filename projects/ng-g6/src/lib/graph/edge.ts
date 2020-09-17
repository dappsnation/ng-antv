import { Directive, Input } from '@angular/core';
import { EdgeConfig, IPoint, LoopConfig } from '@antv/g6/lib/types';
import { G6Item, itemKeys } from './item';

const edgeKeys = [
  'id', 'source', 'target', 'sourceNode', 'targetNode',
  'controlPoints', 'curveOffset', 'loopCfg'
] as const;

@Directive({ selector: 'g6-edge' })
export class G6Edge extends G6Item<EdgeConfig> {
  protected readonly keys = [ ...itemKeys, ...edgeKeys ];
  @Input() id: string = `edge_${Math.random().toString(36).substr(2, 9)}`;
  @Input() source?: string;
  @Input() target?: string;
  @Input() sourceNode?: Node;
  @Input() targetNode?: Node;
  @Input() controlPoints?: IPoint[];
  @Input() curveOffset?: number | number[];
  @Input() loopCfg?: LoopConfig;
}
