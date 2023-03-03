import { Directive, ContentChildren, Input, Output, EventEmitter, QueryList } from "@angular/core";
import { IG6GraphEvent, ModelConfig, ShapeStyle, StateStyles, TreeGraphData } from '@antv/g6';

const nodeKeys: Extract<(keyof TreeGraphData), string>[] = [
  'id', 'label', 'x', 'y',
  'data', 'side', 'depth', 'collapsed',
  'style', 'stateStyles',
];

function copy(from: any, to: any, keys: string[]) {
  for (const key of keys) {
    if (from[key]) {
      to[key] = from[key];
    }
  }
}

@Directive({ selector: 'g6-tree-node' })
export class G6TreeNode {
  @Input() id: string = `node_${Math.random().toString(36).substr(2, 9)}`;
  @Input() label?: string;
  @Input() x?: number;
  @Input() y?: number;
  @Input() data?: ModelConfig;
  @Input() side?: 'left' | 'right';
  @Input() depth?: number;
  @Input() collapsed?: boolean;
  @Input() style?: ShapeStyle | Record<string, ShapeStyle>;
  @Input() stateStyles?: StateStyles;
  @Input()
  set config(item: TreeGraphData) {
    copy(item, this, nodeKeys);
  }
  get config(): TreeGraphData {
    const item = {};
    copy(this, item, nodeKeys);
    return { ...item, children: this.children.map(node => node.config) } as TreeGraphData;
  }

  @Output() click = new EventEmitter<IG6GraphEvent>();
  @Output() contextmenu = new EventEmitter<IG6GraphEvent>();
  @Output() dbclick = new EventEmitter<IG6GraphEvent>();
  @Output() mouseenter = new EventEmitter<IG6GraphEvent>();
  @Output() mouseleave = new EventEmitter<IG6GraphEvent>();
  @Output() mousemove = new EventEmitter<IG6GraphEvent>();
  @Output() hover = new EventEmitter<IG6GraphEvent>();
  @Output() wheel = new EventEmitter<IG6GraphEvent>();
  @Output() drag = new EventEmitter<IG6GraphEvent>();
  @Output() dragstart = new EventEmitter<IG6GraphEvent>();
  @Output() dragend = new EventEmitter<IG6GraphEvent>();
  @Output() dragleave = new EventEmitter<IG6GraphEvent>();
  @Output() drop = new EventEmitter<IG6GraphEvent>();

  @ContentChildren(G6TreeNode) children!: QueryList<G6TreeNode>;

  getChildren(): G6TreeNode[]  {
    const output: G6TreeNode[] = [];
    for (const child of this.children) {
      const children = child.getChildren();
      output.concat(children);
    }
    return output;
  }

}