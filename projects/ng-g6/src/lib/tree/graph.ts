import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, Inject, Input, ViewContainerRef  } from '@angular/core';
import { TreeGraph } from '@antv/g6';
import { GraphOptions, LayoutConfig } from '@antv/g6/lib/types';
import { G6GraphBase } from '../core';
import { G6TreeNode } from './node';
import { G6_TREE_GRAPH_OPTIONS } from './options';



@Component({
  selector: 'g6-tree-graph',
  template: '<ng-content></ng-content>',
  styles: [':host {display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class G6TreeGraph extends G6GraphBase {
  public graph: TreeGraph;
  private node: Record<string, G6TreeNode> = {};
  @ContentChild(G6TreeNode) root?: G6TreeNode;

  @Input() set layout(layout: LayoutConfig) {
    this.graph.changeLayout(layout);
  }

  constructor(
    @Inject(G6_TREE_GRAPH_OPTIONS) options: Partial<GraphOptions>,
    el: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    const container = el.nativeElement;
    const { width, height } = container.getBoundingClientRect();
    this.graph = new TreeGraph({ container, width, height, ...options });
  }

  ngAfterViewInit(): void {
    if (this.root) {
      this.updateNodes();
      this.graph.data(this.root.config);
    }
    this.graph.render();
    this.startListening();
  }

  private updateNodes() {
    const nodes = this.root?.getChildren() ?? [];
    this.node = {};
    for (const node of nodes) {
      this.node[node.id] = node;
    }
  }

  update() {
    if (this.root) {
      this.updateNodes();
      this.graph.changeData(this.root.config);
    }
  }
}
