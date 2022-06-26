import { FormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { NodeConfig } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormNode extends UntypedFormGroup {

  constructor(node: Partial<NodeConfig> = {}) {
    super({
      id: new UntypedFormControl(node.id),
      label: new UntypedFormControl(node.label),
      shape: new UntypedFormControl(node.shape),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormNodeList extends UntypedFormGroup {
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

  getNode(id: string): FormNode {
    return this.controls[id] as FormNode;
  }
}