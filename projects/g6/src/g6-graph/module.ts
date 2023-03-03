import { NgModule } from '@angular/core';

import { G6Graph } from './graph';
import { G6Edge } from "./edge";
import { G6Combo } from "./combo";
import { G6Node } from "./node";
import { G6MenuModule } from '../g6-menu/module';

import { defaultOptions, G6_GRAPH_OPTIONS } from './options';

@NgModule({
  declarations: [
    G6Graph,
    G6Node,
    G6Edge,
    G6Combo,
  ],
  exports: [
    G6Graph,
    G6Node,
    G6Edge,
    G6Combo,
  ],
  imports: [G6MenuModule],
  providers: [{
    provide: G6_GRAPH_OPTIONS,
    useValue: defaultOptions
  }],
})
export class G6GraphModule { }
