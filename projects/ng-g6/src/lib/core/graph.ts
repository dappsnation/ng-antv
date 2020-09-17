import { OverlayRef } from '@angular/cdk/overlay';
import { ViewContainerRef, Directive, Optional, Output, EventEmitter, OnDestroy, Input  } from '@angular/core';
import { Graph, TreeGraph } from '@antv/g6';
import { EdgeConfig, G6Event, IG6GraphEvent, Item, ITEM_TYPE } from '@antv/g6/lib/types';


type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never}[keyof T];
type CanvasEvent = KeysMatching<G6GraphBase, EventEmitter<IG6GraphEvent>>;

@Directive()
export abstract class G6GraphBase implements OnDestroy {
  abstract graph: Graph | TreeGraph;
  public overlayRef: OverlayRef;


  @Input() set mode(mode: string) {
    this.graph.setMode(mode);
  }

  @Input() set autopaint(autopaint: string | boolean) {
    this.graph.setAutoPaint(typeof autopaint === 'string' || autopaint === true);
  }

  @Input() set maxZoom(ratio: number) {
    this.graph.setMaxZoom(ratio);
  }

  @Input() set minZoom(ratio: number) {
    this.graph.setMinZoom(ratio);
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

  constructor(@Optional() public viewContainerRef: ViewContainerRef) {}

  startListening(): void {
    const triggerEventOn = (item: ITEM_TYPE, name: string) => (e: IG6GraphEvent) => {
      this[item]?.[e.item?.getID()]?.[name].emit(e);
    }

    const triggerEvent = (name: CanvasEvent) => (e: IG6GraphEvent) => {
      const type = e.item?.getType();
      return type ? triggerEventOn(type, name)(e) : this[name].emit(e);
    }

    
    this.graph.on(G6Event.CONTEXTMENU, triggerEvent('contextmenu'));
    this.graph.on(G6Event.MOUSEOVER, triggerEvent('hover'));
    this.graph.on(G6Event.DBLCLICK, triggerEvent('dbclick'));
    this.graph.on(G6Event.MOUSEENTER, triggerEvent('mouseenter'));
    this.graph.on(G6Event.MOUSELEAVE, triggerEvent('mouseleave'));
    this.graph.on(G6Event.MOUSEMOVE, triggerEvent('mousemove'));
    this.graph.on(G6Event.WHEEL, triggerEvent('wheel'));
    // Close context menu when click outside
    this.graph.on(G6Event.CLICK, (e: IG6GraphEvent) => {
      this.closeContextMenu();
      triggerEvent('click')(e);
    });
  
    // NODE
    this.graph.on(G6Event.NODE_DRAG, triggerEventOn('node', 'drag'));
    this.graph.on(G6Event.NODE_DRAGSTART, triggerEventOn('node', 'dragstart'));
    this.graph.on(G6Event.NODE_DRAGEND, triggerEventOn('node', 'dragend'));
    this.graph.on(G6Event.NODE_DRAGLEAVE, triggerEventOn('node', 'dragleave'));
    this.graph.on(G6Event.NODE_DROP, triggerEventOn('node', 'drop'));


    // Behavior built-in
    this.graph.on('aftercreateedge', ({ edge }: { edge: Item }) => this.createEdge.emit(edge.getModel()));

  }

  closeContextMenu() {
    this.overlayRef?.detach();
  }

  ngOnDestroy() {
    this.graph.off();
    this.overlayRef?.dispose();
  }
}
