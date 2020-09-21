import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GraphOptions } from '@antv/g6/lib/types';
import { map, startWith } from 'rxjs/operators';

export class FormCanvas extends FormGroup {

  modeKeys$ = this.select('modes')?.pipe(map(modes => Object.keys(modes)));

  modes$ = this.select('modes');
  mode$ = this.select('mode');

  constructor() {
    super({
      // Node
      mode: new FormControl('default'),
      modes: new FormGroup({
        default: new FormControl([])
      }),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

  get modes(): FormGroup {
    return this.get('modes') as FormGroup;
  }

}