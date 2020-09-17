import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, Input, QueryList, ViewContainerRef } from '@angular/core';
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


@Component({
  selector: 'g6-graph',
  template: '<ng-content></ng-content>',
  styles: [':host {display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class G6Graph extends G6GraphBase {
  public graph: Graph;
  private sub?: Subscription;
  private node: Record<string, G6Node> = {};
  private edge: Record<string, G6Edge> = {};
  private group: Record<string, G6Group> = {};
  private combo: Record<string, G6Combo> = {};

  @Input() set layout(layout: LayoutConfig) {
    this.graph.updateLayout(layout)
  }


  @ContentChildren(G6Node) private nodeQuery?: QueryList<G6Node>;
  @ContentChildren(G6Edge) private edgeQuery?: QueryList<G6Edge>;
  @ContentChildren(G6Group) private groupQuery?: QueryList<G6Group>;
  @ContentChildren(G6Combo) private comboQuery?: QueryList<G6Combo>;

  constructor(
    @Inject(G6_GRAPH_OPTIONS) options: GraphOptions,
    el: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef
  ) {
    super(viewContainerRef);
    const container = el.nativeElement;
    const { width, height } = container.getBoundingClientRect();
    this.graph = new Graph({ ...options, container, width, height });
  }

  ngAfterViewInit(): void {
    this.graph.data();
    this.graph.render();
    this.sub = combineLatest([
      this.nodeQuery?.changes.pipe(startWith(this.nodeQuery)) ?? [],
      this.edgeQuery?.changes.pipe(startWith(this.edgeQuery)) ?? [],
      this.groupQuery?.changes.pipe(startWith(this.groupQuery)) ?? [],
      this.comboQuery?.changes.pipe(startWith(this.comboQuery)) ?? [],
    ]).pipe(
      debounceTime(100)
    ).subscribe(([nodes, edges, groups, combos]) => {
      nodes.forEach((node: G6Node) => this.node[node.id] = node);
      edges.forEach((edge: G6Edge) => this.edge[edge.id] = edge);
      groups.forEach((group: G6Group) => this.group[group.id] = group);
      combos.forEach((combo: G6Combo) => this.combo[combo.id] = combo);
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
