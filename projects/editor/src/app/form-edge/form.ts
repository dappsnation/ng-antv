import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { EdgeConfig } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormEdge extends FormGroup {

  constructor(node: Partial<EdgeConfig> = {}) {
    super({
      id: new FormControl(node.id),
      type: new FormControl(node.type),
      label: new FormControl(node.label),
      source: new FormControl(node.source),
      target: new FormControl(node.target),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormEdgeList extends FormGroup {
  value$: Observable<EdgeConfig[]>;
  
  constructor(edges: EdgeConfig[] = []) {
    const controls: Record<string, FormEdge> = {};
    for (const edge of edges) {
      controls[edge.id!] = new FormEdge(edge);
    }
    super(controls);
    this.value$ = this.valueChanges.pipe(
      startWith(this.value),
      map(value => Object.values(value))
    );
  }


  add(edge: EdgeConfig) {
    this.addControl(edge.id!, new FormEdge(edge));
  }

  getEdge(id: string): FormEdge {
    return this.controls[id] as FormEdge;
  }
}