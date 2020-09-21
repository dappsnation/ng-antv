import { Input, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormCanvas, layouts } from './form';

const modes = [
  'drag-combo', 'collapse-expand-combo', 'drag-canvas', 'zoom-canvas', 'drag-node',
  'click-select', 'tooltip', 'edge-tooltip', 'activate-relations', 'brush-select', 'lasso-select',
  'collapse-expand', 'collapse-expand-group', 'drag-group', 'drag-node-with-group', 'create-edge'
] as const;

@Component({
  selector: 'editor-form-canvas',
  templateUrl: './form-canvas.component.html',
  styleUrls: ['./form-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCanvasComponent implements OnInit {
  public modes = modes;
  public layouts = layouts;

  @Input() form = new FormCanvas();
  constructor() { }

  ngOnInit(): void {
  }

  addMode(input: HTMLInputElement) {
    this.form.modes.addControl(input.value, new FormControl([]));
    input.value = '';
  }

}
