import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { GraphOptions } from '@antv/g6/lib/types';
import { map, startWith } from 'rxjs/operators';

export class FormCanvas extends UntypedFormGroup {

  modeKeys$ = this.select('modes')?.pipe(map(modes => Object.keys(modes)));

  modes$ = this.select('modes');
  mode$ = this.select('mode');

  constructor(options: Partial<GraphOptions> = {}) {
    super({
      mode: new UntypedFormControl('default'),
      modes: new UntypedFormGroup({
        default: new UntypedFormControl(options.modes?.default || [])
      }),
      layout: new UntypedFormGroup({
        type: new UntypedFormControl(),
      }),
      minZoom: new UntypedFormControl(),
      maxZoom: new UntypedFormControl(),
      autopaint: new UntypedFormControl(),
    })
  }

  select(key: string) {
    return this.get(key)?.valueChanges.pipe(
      startWith(this.get(key)?.value)
    );
  }

  get modes(): UntypedFormGroup {
    return this.get('modes') as UntypedFormGroup;
  }

}

export const layouts = {
  random: new UntypedFormGroup({
    type: new UntypedFormControl('random'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    width: new UntypedFormControl(),
    height: new UntypedFormControl(),
    workerEnabled: new UntypedFormControl(false),
  }),
  mds: new UntypedFormGroup({
    type: new UntypedFormControl('mds'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    linkDistance: new UntypedFormControl(50),
    workerEnabled: new UntypedFormControl(false),
  }),
  force: new UntypedFormGroup({
    type: new UntypedFormControl('force'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    linkDistance: new UntypedFormControl(50),
    nodeStrength: new UntypedFormControl(),
    edgeStrength: new UntypedFormControl(),
    preventOverlap: new UntypedFormControl(false),
    collideStrength: new UntypedFormControl(1),
    nodeSize: new UntypedFormControl(10),
    nodeSpacing: new UntypedFormControl(0),
    alpha: new UntypedFormControl(0.3),
    alphaDecay: new UntypedFormControl(0.028),
    alphaMin: new UntypedFormControl(0.001),
    workerEnabled: new UntypedFormControl(false),
  }),
  fruchterman: new UntypedFormGroup({
    type: new UntypedFormControl('fruchterman'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    maxIteration: new UntypedFormControl(1000),
    gravity: new UntypedFormControl(10),
    speed: new UntypedFormControl(1),
    clustering: new UntypedFormControl(false),
    clusterGravity: new UntypedFormControl(10),
    workerEnabled: new UntypedFormControl(false),
  }),
  circular: new UntypedFormGroup({
    type: new UntypedFormControl('circular'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    radius: new UntypedFormControl(),
    startRadius: new UntypedFormControl(),
    endRadius: new UntypedFormControl(),
    clockwise: new UntypedFormControl(true),
    divisions: new UntypedFormControl(1),
    ordering: new UntypedFormControl(false), // options: null | 'topology' | 'degree'
    angleRatio: new UntypedFormControl(1),
    workerEnabled: new UntypedFormControl(false),
  }),
  radial: new UntypedFormGroup({
    type: new UntypedFormControl('radial'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    linkDistance: new UntypedFormControl(10),
    maxIteration: new UntypedFormControl(1000),
    focusNode: new UntypedFormControl(),
    unitRadius: new UntypedFormControl(100),
    preventOverlap: new UntypedFormControl(false),
    nodeSize: new UntypedFormControl(10),
    nodeSpacing: new UntypedFormControl(0),
    maxPreventOverlapIteration: new UntypedFormControl(200),
    strictRadial: new UntypedFormControl(true),
    sortBy: new UntypedFormControl(),
    sortStrength: new UntypedFormControl(10),
    workerEnabled: new UntypedFormControl(false),
  }),
  dagre: new UntypedFormGroup({
    type: new UntypedFormControl('dagre'),
    rankdir: new UntypedFormControl('TB'), // 'TB' | 'BT' | 'LR' | 'RL'
    align: new UntypedFormControl('UL'), // 'UL' | 'UR' | 'DL' | 'DR' 
    nodesep: new UntypedFormControl(50),
    ranksep: new UntypedFormControl(50),
    controlPoints: new UntypedFormControl(true),
    sortByCombo: new UntypedFormControl(false),
    workerEnabled: new UntypedFormControl(false),
  }),
  concentric: new UntypedFormGroup({
    type: new UntypedFormControl('concentric'),
    center: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]), // [0, 0]
    preventOverlap: new UntypedFormControl(false),
    nodeSize: new UntypedFormControl(30),
    minNodeSpacing: new UntypedFormControl(10),
    sweep: new UntypedFormControl(),
    equidistant: new UntypedFormControl(false),
    startAngle: new UntypedFormControl(3 / 2 * Math.PI),
    clockwise: new UntypedFormControl(false),
    maxLevelDiff: new UntypedFormControl(),
    sortBy: new UntypedFormControl(),
    workerEnabled: new UntypedFormControl(false),
  }),
  grid: new UntypedFormGroup({
    type: new UntypedFormControl('grid'),
    begin: new UntypedFormArray([new UntypedFormControl(0), new UntypedFormControl(0)]),
    preventOverlap: new UntypedFormControl(false),
    nodeSize: new UntypedFormControl(30),
    preventOverlapPadding: new UntypedFormControl(10),
    condense: new UntypedFormControl(false),
    rows: new UntypedFormControl(),
    cols: new UntypedFormControl(),
    sortBy: new UntypedFormControl(),
    workerEnabled: new UntypedFormControl(false),
  }),
  
}