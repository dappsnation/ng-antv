import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { EdgeConfig } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormEdge extends UntypedFormGroup {

  constructor(node: Partial<EdgeConfig> = {}) {
    super({
      id: new UntypedFormControl(node.id),
      type: new UntypedFormControl(node.type),
      label: new UntypedFormControl(node.label),
      source: new UntypedFormControl(node.source),
      target: new UntypedFormControl(node.target),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormEdgeList extends UntypedFormGroup {
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