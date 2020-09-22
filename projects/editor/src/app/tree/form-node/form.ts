import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TreeGraphData } from '@antv/g6/lib/types';
import { Observable } from 'rxjs';

export class FormNode extends FormGroup {

  value$ = this.valueChanges.pipe(startWith(this.value));

  constructor(node: Partial<TreeGraphData> = {}) {
    super({
      id: new FormControl(node.id),
      label: new FormControl(node.label),
      children: new FormArray(node.children?.map(child => new FormNode(child)) || [])
    })
  }

  get children(): FormNodeList {
    return this.get('children') as FormNodeList;
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

}

export class FormNodeList extends FormGroup {
  value$: Observable<TreeGraphData[]>;
  
  constructor(nodes: TreeGraphData[] = []) {
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


  add(node: TreeGraphData) {
    this.addControl(node.id, new FormNode(node));
  }

  getNode(id: string): FormNode {
    return this.controls[id] as FormNode;
  }
}