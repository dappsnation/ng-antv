import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormEdge } from './form';

@Component({
  selector: 'editor-form-edge',
  templateUrl: './form-edge.component.html',
  styleUrls: ['./form-edge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEdgeComponent implements OnInit {
  types = ['line', 'polyline', 'arc', 'quadratic', 'cubic', 'cubic-vertical', 'cubic-horizontal', 'loop'];
  @Input() form: FormEdge = new FormEdge();
  constructor() { }

  ngOnInit(): void {
  }

}
