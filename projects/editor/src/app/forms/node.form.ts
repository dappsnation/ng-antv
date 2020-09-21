import { FormControl, FormGroup } from '@angular/forms';
import { ModelConfig, NodeConfig } from '@antv/g6/lib/types';

function nodeForm(node: Partial<NodeConfig> = {}) {
  return new FormGroup({
    id: new FormControl(node.id),
    groupId: new FormControl(),
    comboId: new FormControl(),
    description: new FormControl(),
    img: new FormControl(),
    innerR: new FormControl(),  // number
    direction: new FormControl(), //
  })
}

function itemForm(item: Partial<ModelConfig> = {}) {
  return new FormGroup({
    label: new FormControl(item.label),
    shape: new FormControl(item.shape),
  })
}