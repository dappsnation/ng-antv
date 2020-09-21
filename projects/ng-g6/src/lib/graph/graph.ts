import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, QueryList, ViewContainerRef, ViewEncapsulation, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Graph } from '@antv/g6';
import { GraphOptions, LayoutConfig } from '@antv/g6/lib/types';
import { combineLatest, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { G6Combo } from './combo';
import { G6Edge } from './edge';
import { G6Node } from './node';
import { G6GraphBase } from '../core';
import { G6_GRAPH_OPTIONS } from './options';
import { G6Group } from './group';

type ItemRecord = {
  node: Record<string, G6Node>,
  edge: Record<string, G6Edge>,
  group: Record<string, G6Group>,
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
    group: {},
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

  @Input() set layout(layout: LayoutConfig) {
    if (layout?.type) {
      this.graph.updateLayout(layout)
    }
  }


  @ContentChildren(G6Node) private nodeQuery?: QueryList<G6Node>;
  @ContentChildren(G6Edge) private edgeQuery?: QueryList<G6Edge>;
  @ContentChildren(G6Group) private groupQuery?: QueryList<G6Group>;
  @ContentChildren(G6Combo) private comboQuery?: QueryList<G6Combo>;

  constructor(
    @Inject(G6_GRAPH_OPTIONS) private options: GraphOptions,
    private el: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    const container = this.el.nativeElement;
    this.graph = new Graph({ ...this.options, container, width: 0, height: 0 });
  }

  ngAfterViewInit(): void {
    const { width, height } = this.el.nativeElement.getBoundingClientRect();
    this.graph.changeSize(width, height);
    this.graph.data({});
    this.graph.render();
    this.sub = combineLatest([
      this.nodeQuery?.changes.pipe(startWith(this.nodeQuery)) ?? [],
      this.edgeQuery?.changes.pipe(startWith(this.edgeQuery)) ?? [],
      this.groupQuery?.changes.pipe(startWith(this.groupQuery)) ?? [],
      this.comboQuery?.changes.pipe(startWith(this.comboQuery)) ?? [],
    ]).pipe(
      debounceTime(100)
    ).subscribe(([nodes, edges, groups, combos]) => {
      nodes.forEach((node: G6Node) => this.items.node[node.id] = node);
      edges.forEach((edge: G6Edge) => this.items.edge[edge.id] = edge);
      groups.forEach((group: G6Group) => this.items.group[group.id] = group);
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
    this.graph.changeData({
      nodes: this.nodeQuery?.map(n => n.config) ?? [],
      edges: this.edgeQuery?.map(n => n.config) ?? [],
      groups: this.groupQuery?.map(g => g.config) ?? [],
      combos: this.comboQuery?.map(c => c.config) ?? [],
    });
  }
}
