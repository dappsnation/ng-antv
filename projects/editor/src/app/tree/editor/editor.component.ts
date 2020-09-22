import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormNode } from '../form-node/form';
import { FormCanvas } from '../form-canvas/form';

const node = { id: '0', label: 'root', children: [{ id: '1', label: 'leaf' }] }

@Component({
  selector: 'editor-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent {
  selection: 'node' | 'graph' = 'graph';
  selectedId?: string;
  nodesForm = new FormNode(node);
  canvasForm = new FormCanvas();

  constructor() { }

  select(selection: 'node' | 'graph', id?: string) {
    console.log('SELECT', selection, id);
    this.selection = selection;
    this.selectedId = id;
  }
}
