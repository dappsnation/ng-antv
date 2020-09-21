import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { NodeConfig } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormNode extends FormGroup {

  constructor(node: Partial<NodeConfig> = {}) {
    super({
      id: new FormControl(node.id),
      label: new FormControl(node.label),
      shape: new FormControl(node.shape),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormNodeList extends FormGroup {
  value$: Observable<NodeConfig[]>;
  
  constructor(nodes: NodeConfig[] = []) {
    const controls: Record<string, FormNode> = {};
    for (const node of nodes) {
      controls[node.id] = new FormNode(node);
    }
    super(controls);
    this.value$ = this.valueChanges.pipe(
      startWith(this.value),
      map(value => Object.values(value))
    );
  }


  add(node: NodeConfig) {
    this.addControl(node.id, new FormNode(node));
  }

  get(id: string): FormNode {
    return this.get(id);
  }
}