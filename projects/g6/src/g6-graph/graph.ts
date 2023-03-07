import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, QueryList, ViewContainerRef } from '@angular/core';
import { Graph, GraphOptions, LayoutConfig } from '@antv/g6';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { G6Combo } from './combo';
import { G6Edge } from './edge';
import { G6Node } from './node';
import { G6GraphBase } from '../g6-core';
import { G6_GRAPH_OPTIONS } from './options';

type ItemRecord = {
  node: Record<string, G6Node>,
  edge: Record<string, G6Edge>,
  combo: Record<string, G6Combo>,
}

@Component({
  selector: 'g6-graph',
  template: '<ng-content></ng-content>',
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class G6Graph extends G6GraphBase {
  public graph: Graph;
  private sub?: Subscription;
  protected items: ItemRecord = {
    node: {},
    edge: {},
    combo: {}
  };

  @Input() set modes(modes: Record<string, string[]>) {
    for (const mode in modes) {
      const current = this.graph.get('modes')[mode];
      this.graph.set({ modes });
      if (current) {
        this.graph.removeBehaviors(current, mode);
      }
      this.graph.addBehaviors(modes[mode], mode);
    }
  }

  @Input() set layout(layout: LayoutConfig | string) {
    if (typeof layout === 'string') {
      this.graph.updateLayout({ type: layout })
    } else if (layout?.type) {
      this.graph.updateLayout(layout)
    }
  }

  /** Refit the graph in the canvas on change. Only work if `fitView` is `true` */
  @Input() autoFit: boolean | '' = false;


  @ContentChildren(G6Node) private nodeQuery?: QueryList<G6Node>;
  @ContentChildren(G6Edge) private edgeQuery?: QueryList<G6Edge>;
  @ContentChildren(G6Combo) private comboQuery?: QueryList<G6Combo>;

  constructor(
    private el: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef,
    @Inject(G6_GRAPH_OPTIONS) baseOptions: GraphOptions,
  ) {
    super(viewContainerRef);
    const container = this.el.nativeElement;
    this.graph = new Graph({ ...baseOptions, container });
  }
  
  ngAfterViewInit(): void {
    const { width, height } = this.el.nativeElement.getBoundingClientRect();
    if (width !== this.graph.getWidth() || height !== this.graph.getHeight()) {
      this.graph.changeSize(width, height);
    }
    this.sub = combineLatest([
      this.nodeQuery?.changes.pipe(startWith(this.nodeQuery)) ?? [],
      this.edgeQuery?.changes.pipe(startWith(this.edgeQuery)) ?? [],
      this.comboQuery?.changes.pipe(startWith(this.comboQuery)) ?? [],
    ]).pipe(
      debounceTime(100)
    ).subscribe(([nodes, edges, combos]) => {
      nodes.forEach((node: G6Node) => this.items.node[node.id] = node);
      edges.forEach((edge: G6Edge) => this.items.edge[edge.id] = edge);
      combos.forEach((combo: G6Combo) => this.items.combo[combo.id] = combo);
      this.update();
    })
    this.startListening();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    super.ngOnDestroy();
  }

  update() {
    const data = {
      nodes: this.nodeQuery?.map(n => n.config) ?? [],
      edges: this.edgeQuery?.map(n => n.config) ?? [],
      combos: this.comboQuery?.map(c => c.config) ?? [],
    };
    if (this.autoFit || this.autoFit === '') {
      this.graph.data(data);
      this.graph.render();
    } else {
      this.graph.changeData(data);
    }
  }
}
