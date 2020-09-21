import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { EdgeConfig, NodeConfig } from '@antv/g6/lib/types';
import { G6Graph } from 'ng-g6/graph';
import { FormCanvas } from './form-canvas/form';

@Component({
  selector: 'editor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild(G6Graph) graph?: G6Graph;
  canvasForm = new FormCanvas();
  nodes: NodeConfig[] = [];
  edges: EdgeConfig[] = [];

  ngOnInit() {
    console.log(this.canvasForm);
  }

  addNode() {
    this.nodes.push({ id: Math.random().toString() });
  }
}
