import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormEdge } from './form';

@Component({
  selector: 'editor-form-edge',
  templateUrl: './form-edge.component.html',
  styleUrls: ['./form-edge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEdgeComponent implements OnInit {

  @Input() form: FormEdge = new FormEdge();
  constructor() { }

  ngOnInit(): void {
  }

}
