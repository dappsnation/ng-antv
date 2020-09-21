import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, Optional, TemplateRef } from '@angular/core';
import { IG6GraphEvent, Item } from '@antv/g6/lib/types';
import { G6Graph } from '../g6-graph/graph';
import { G6TreeGraph } from '../g6-tree/graph';

// TODO add G6Item & event
type Context<T> = { $implicit: T };

@Directive({ selector: '[g6Menu]' })
export class G6Menu {

  private graph: G6Graph | G6TreeGraph;

  constructor(
    @Optional() graph: G6Graph,
    @Optional() treegraph: G6TreeGraph,
    private overlay: Overlay,
    public template: TemplateRef<Context<Item>>
  ) {
    this.graph = graph || treegraph;
  }

  public open(e: IG6GraphEvent) {
    e.preventDefault();
    e.stopPropagation();
    // Prevent native context menu event (needed because graph is a component)
    if (e.canvasX & e.canvasY) {
      this.close();
      const x = e.canvasX;
      const y = e.canvasY;
      if (!this.graph.overlayRef) {
        this.graph.overlayRef = this.overlay.create({
          scrollStrategy: this.overlay.scrollStrategies.close(),
        });
      }

      const portal = new TemplatePortal(this.template, this.graph.viewContainerRef, {
        $implicit: e.item
      });
      const positionStrategy = this.overlay.position()
        .flexibleConnectedTo({ x, y })
        .withPositions([{ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top', }]);
      this.graph.overlayRef.attach(portal);
      this.graph.overlayRef.updatePositionStrategy(positionStrategy);
    }
  }

  public close() {
    this.graph.overlayRef?.detach();
  }
}