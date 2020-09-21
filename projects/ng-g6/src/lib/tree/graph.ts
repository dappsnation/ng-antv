import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Inject, Input, ViewContainerRef  } from '@angular/core';
import { TreeGraph } from '@antv/g6';
import { GraphOptions, LayoutConfig } from '@antv/g6/lib/types';
import { G6GraphBase } from '../core';
import { G6TreeNode } from './node';
import { G6_TREE_GRAPH_OPTIONS } from './options';

type ItemRecord = {
  node: Record<string, G6TreeNode>,
}

@Component({
  selector: 'g6-tree-graph',
  template: '<ng-content></ng-content>',
  styles: [':host {display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class G6TreeGraph extends G6GraphBase {
  public graph: TreeGraph;
  protected items: ItemRecord = {
    node: {}
  }

  @ContentChild(G6TreeNode) root?: G6TreeNode;

  @Input() set layout(layout: LayoutConfig) {
    this.graph.changeLayout(layout);
  }

  constructor(
    @Inject(G6_TREE_GRAPH_OPTIONS) private options: Partial<GraphOptions>,
    private el: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    const container = this.el.nativeElement;
    this.graph = new TreeGraph({ ...this.options, container, width: 0, height: 0 });
  }
  
  ngAfterViewInit(): void {
    const { width, height } = this.el.nativeElement.getBoundingClientRect();
    this.graph.changeSize(width, height);
    if (this.root) {
      this.updateNodes();
      this.graph.data(this.root.config);
    }
    this.graph.render();
    this.startListening();
  }

  private updateNodes() {
    const nodes = this.root?.getChildren() ?? [];
    this.items.node = {};
    for (const node of nodes) {
      this.items.node[node.id] = node;
    }
  }

  update() {
    if (this.root) {
      this.updateNodes();
      this.graph.changeData(this.root.config);
    }
  }
}
