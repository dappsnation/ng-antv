import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GraphOptions } from '@antv/g6/lib/types';
import { map, startWith } from 'rxjs/operators';

export class FormCanvas extends FormGroup {

  modeKeys$ = this.select('modes')?.pipe(map(modes => Object.keys(modes)));

  modes$ = this.select('modes');
  mode$ = this.select('mode');

  constructor() {
    super({
      mode: new FormControl('default'),
      modes: new FormGroup({
        default: new FormControl([])
      }),
      layout: new FormGroup({
        type: new FormControl(),
      }),
      minZoom: new FormControl(),
      maxZoom: new FormControl(),
      autopaint: new FormControl(),
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

export const layouts = {
  random: new FormGroup({
    type: new FormControl('random'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    width: new FormControl(),
    height: new FormControl(),
    workerEnabled: new FormControl(false),
  }),
  mds: new FormGroup({
    type: new FormControl('mds'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    linkDistance: new FormControl(50),
    workerEnabled: new FormControl(false),
  }),
  force: new FormGroup({
    type: new FormControl('force'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    linkDistance: new FormControl(50),
    nodeStrength: new FormControl(),
    edgeStrength: new FormControl(),
    preventOverlap: new FormControl(false),
    collideStrength: new FormControl(1),
    nodeSize: new FormControl(10),
    nodeSpacing: new FormControl(0),
    alpha: new FormControl(0.3),
    alphaDecay: new FormControl(0.028),
    alphaMin: new FormControl(0.001),
    workerEnabled: new FormControl(false),
  }),
  fruchterman: new FormGroup({
    type: new FormControl('fruchterman'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    maxIteration: new FormControl(1000),
    gravity: new FormControl(10),
    speed: new FormControl(1),
    clustering: new FormControl(false),
    clusterGravity: new FormControl(10),
    workerEnabled: new FormControl(false),
  }),
  circular: new FormGroup({
    type: new FormControl('circular'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    radius: new FormControl(),
    startRadius: new FormControl(),
    endRadius: new FormControl(),
    clockwise: new FormControl(true),
    divisions: new FormControl(1),
    ordering: new FormControl(false), // options: null | 'topology' | 'degree'
    angleRatio: new FormControl(1),
    workerEnabled: new FormControl(false),
  }),
  radial: new FormGroup({
    type: new FormControl('radial'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    linkDistance: new FormControl(10),
    maxIteration: new FormControl(1000),
    focusNode: new FormControl(),
    unitRadius: new FormControl(100),
    preventOverlap: new FormControl(false),
    nodeSize: new FormControl(10),
    nodeSpacing: new FormControl(0),
    maxPreventOverlapIteration: new FormControl(200),
    strictRadial: new FormControl(true),
    sortBy: new FormControl(),
    sortStrength: new FormControl(10),
    workerEnabled: new FormControl(false),
  }),
  dagre: new FormGroup({
    type: new FormControl('dagre'),
    rankdir: new FormControl('TB'), // 'TB' | 'BT' | 'LR' | 'RL'
    align: new FormControl('UL'), // 'UL' | 'UR' | 'DL' | 'DR' 
    nodesep: new FormControl(50),
    ranksep: new FormControl(50),
    controlPoints: new FormControl(true),
    sortByCombo: new FormControl(false),
    workerEnabled: new FormControl(false),
  }),
  concentric: new FormGroup({
    type: new FormControl('concentric'),
    center: new FormArray([new FormControl(0), new FormControl(0)]), // [0, 0]
    preventOverlap: new FormControl(false),
    nodeSize: new FormControl(30),
    minNodeSpacing: new FormControl(10),
    sweep: new FormControl(),
    equidistant: new FormControl(false),
    startAngle: new FormControl(3 / 2 * Math.PI),
    clockwise: new FormControl(false),
    maxLevelDiff: new FormControl(),
    sortBy: new FormControl(),
    workerEnabled: new FormControl(false),
  }),
  grid: new FormGroup({
    type: new FormControl('grid'),
    begin: new FormArray([new FormControl(0), new FormControl(0)]),
    preventOverlap: new FormControl(false),
    nodeSize: new FormControl(30),
    preventOverlapPadding: new FormControl(10),
    condense: new FormControl(false),
    rows: new FormControl(),
    cols: new FormControl(),
    sortBy: new FormControl(),
    workerEnabled: new FormControl(false),
  }),
  
}