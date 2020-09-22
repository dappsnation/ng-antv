import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormNode } from './form';

@Component({
  selector: 'editor-form-node',
  templateUrl: './form-node.component.html',
  styleUrls: ['./form-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormNodeComponent implements OnInit {
  shapes = ['circle', 'rect', 'triangle', 'diamond', 'ellipse', 'star', 'modelRect'];

  @Input() form: FormNode = new FormNode();
  constructor() { }

  ngOnInit(): void {
  }

}
