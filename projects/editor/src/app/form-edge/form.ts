import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { NodeConfig } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormEdge extends FormGroup {

  constructor(node: Partial<NodeConfig> = {}) {
    super({
      id: new FormControl(node.id),
      label: new FormControl(node.label),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormEdgeList extends FormGroup {
  value$: Observable<NodeConfig[]>;
  
  constructor(nodes: NodeConfig[] = []) {
    const controls: Record<string, FormEdge> = {};
    for (const node of nodes) {
      controls[node.id] = new FormEdge(node);
    }
    super(controls);
    this.value$ = this.valueChanges.pipe(
      startWith(this.value),
      map(value => Object.values(value))
    );
  }


  add(node: NodeConfig) {
    this.addControl(node.id, new FormEdge(node));
  }

  getNode(id: string): FormEdge {
    return this.controls[id] as FormEdge;
  }
}