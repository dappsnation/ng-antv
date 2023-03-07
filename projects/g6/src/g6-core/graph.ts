import { OverlayRef } from '@angular/cdk/overlay';
import { ViewContainerRef, Directive, Optional, Output, EventEmitter, OnDestroy, Input  } from '@angular/core';
import { Graph, TreeGraph, EdgeConfig, ICombo, IEdge, INode, Item, ITEM_TYPE, IG6GraphEvent } from '@antv/g6';

interface SelectionEvent extends IG6GraphEvent {
  select: boolean;
  selectedItems: { nodes?: INode[], combos?: ICombo[], edges?: IEdge[] };
}

interface SelectionChange {
  selected: boolean;
  nodes: string[];
  combos: string[];
  edges: string[];
}

type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type CanvasEvent = KeysMatching<G6GraphBase, EventEmitter<IG6GraphEvent>>;

@Directive()
export abstract class G6GraphBase implements OnDestroy {
  abstract graph: Graph | TreeGraph;
  public overlayRef?: OverlayRef;
  protected items: Partial<Record<ITEM_TYPE, Record<string, any>>> = {}


  @Input() set mode(mode: string) {
    this.graph.setMode(mode);
  }

  @Input() set autopaint(autopaint: boolean) {
    if (typeof autopaint === 'boolean') {
      this.graph.setAutoPaint(autopaint);
    }
  }

  @Input() set maxZoom(ratio: number) {
    if (typeof ratio === 'number') {
      this.graph.setMaxZoom(ratio);
    }
  }

  @Input() set minZoom(ratio: number) {
    if (typeof ratio === 'number') {
      this.graph.setMinZoom(ratio);
    }
  }

  @Output() click = new EventEmitter<IG6GraphEvent>();
  @Output() contextmenu = new EventEmitter<IG6GraphEvent>();
  @Output() dbclick = new EventEmitter<IG6GraphEvent>();
  @Output() mouseenter = new EventEmitter<IG6GraphEvent>();
  @Output() mouseleave = new EventEmitter<IG6GraphEvent>();
  @Output() mousemove = new EventEmitter<IG6GraphEvent>();
  @Output() hover = new EventEmitter<IG6GraphEvent>();
  @Output() wheel = new EventEmitter<IG6GraphEvent>();

  @Output() createEdge = new EventEmitter<EdgeConfig>();
  @Output() selectChange = new EventEmitter<SelectionChange>();

  constructor(@Optional() public viewContainerRef: ViewContainerRef) {}

  startListening(): void {
    const triggerEventOn = (item: ITEM_TYPE, name: string) => (e: IG6GraphEvent) => {
      const id = e.item?.getID();
      if (id) {
        return this.items[item]?.[id]?.[name]?.emit(e);
      }
    }

    const triggerEvent = (name: CanvasEvent) => (e: IG6GraphEvent) => {
      const type = e.item?.getType();
      return type ? triggerEventOn(type, name)(e) : this[name]?.emit(e);
    }


    // Prevent canvas to propagate event to parent graph
    const canvas: HTMLCanvasElement = this.graph.get('canvas').cfg.context.canvas;
    canvas.onclick = (e: MouseEvent) => e.stopPropagation();
    canvas.oncontextmenu = (e: MouseEvent) => e.stopPropagation();
    canvas.onmouseenter = (e: MouseEvent) => e.stopPropagation();
    canvas.onmouseleave = (e: MouseEvent) => e.stopPropagation();

    this.graph.on('contextmenu', triggerEvent('contextmenu'));
    this.graph.on('mouseover', triggerEvent('hover'));
    this.graph.on('dblclick', triggerEvent('dbclick'));
    this.graph.on('mouseenter', triggerEvent('mouseenter'));
    this.graph.on('mouseleave', triggerEvent('mouseleave'));
    this.graph.on('mouseleave', triggerEvent('mousemove'));
    this.graph.on('wheel', triggerEvent('wheel'));
    // Close context menu when click outside
    this.graph.on('click', (e: IG6GraphEvent) => {
      this.closeContextMenu();
      triggerEvent('click')(e);
    });
  
    // NODE
    this.graph.on('node:drag', triggerEventOn('node', 'drag'));
    this.graph.on('node:dragstart', triggerEventOn('node', 'dragstart'));
    this.graph.on('node:dragend', triggerEventOn('node', 'dragend'));
    this.graph.on('node:dragleave', triggerEventOn('node', 'dragleave'));
    this.graph.on('node:dragover', triggerEventOn('node', 'dragover'));


    // Behavior built-in
    this.graph.on('aftercreateedge', ({ edge }: { edge: Item }) => this.createEdge.emit(edge.getModel()));
    this.graph.on('nodeselectchange', (e: SelectionEvent) => {
      const change: SelectionChange = { nodes: [], combos: [], edges: [], selected: e.select };
      for (const item of e.selectedItems.nodes || []) {
        this.items['node']?.[item.getID()]?.['selectChange']?.emit(e.select);
        change.nodes.push(item.getID());
      }
      for (const item of e.selectedItems.combos || []) {
        this.items['combo']?.[item.getID()]?.['selectChange']?.emit(e.select);
        change.combos.push(item.getID());
      }
      for (const item of e.selectedItems.edges || []) {
        this.items['edge']?.[item.getID()]?.['selectChange']?.emit(e.select);
        change.edges.push(item.getID());
      }
      this.selectChange.emit(change);
    });


  }

  closeContextMenu() {
    this.overlayRef?.detach();
  }

  ngOnDestroy() {
    this.graph.off();
    this.overlayRef?.dispose();
  }
}
