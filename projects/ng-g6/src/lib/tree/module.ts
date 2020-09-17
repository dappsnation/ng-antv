import { NgModule } from '@angular/core';

import { G6_TREE_GRAPH_OPTIONS, defaultTreeOption } from './options';
import { G6TreeGraph } from './graph';
import { G6TreeNode } from './node';
import { G6MenuModule } from '../menu/module';

@NgModule({
  declarations: [
    G6TreeGraph,
    G6TreeNode,
  ],
  exports: [
    G6TreeGraph,
    G6TreeNode,
  ],
  imports: [G6MenuModule],
  providers: [{
    provide: G6_TREE_GRAPH_OPTIONS,
    useValue: defaultTreeOption
  }],
})
export class G6TreeGraphModule { }
