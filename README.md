<h1 align="center">Angular antv</h1>

A repository for Angular helpers around the [@antv vision](https://antv.vision/) libraries.


## [G6](https://g6.antv.vision/)
[![GitHub](https://img.shields.io/github/license/dappsnation/ng-antv)](LICENSE)
[![npm](https://img.shields.io/npm/v/ng-antv-g6)](https://www.npmjs.com/package/ng-antv-g6)
[![npm](https://img.shields.io/npm/dm/ng-antv-g6)](https://www.npmjs.com/package/ng-antv-g6)

[Documentation](https://ng-antv.netlify.app/doc)

```
npm install @antv/g6 ng-antv-g6
```

### Graph
[Online Editor](https://ng-antv.netlify.app/graph)

Create a module with your default config:

`g6.module.ts`
```typescript
import { G6GraphModule, G6_GRAPH_OPTIONS } from 'ng-antv-g6';

@NgModule({
  exports: [ G6GraphModule ],
  providers: [
    {
      provide: G6_GRAPH_OPTIONS,
      useValue: {
        modes: { default: ['drag-canvas', 'zoom-canvas'] },
        layout: {
          type: 'dagre',
          ranksep: 10,
        },
        defaultNode: {
          type: 'rect',
          anchorPoints: [[ 0.5, 0 ], [ 0.5, 1 ]],
        },
      }
    },
  ]
})
export class G6Module {}
```

Import it into you `AppModule`:

`app.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { G6Module } from './g6.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    G6Module // <-- Here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Now you can use it in your template : 
```html
<g6-graph>
  <g6-node id="0" label="root"></g6-node>
  <g6-node id="1" label="leaf"></g6-node>
  <g6-edge source="0" target="1"></g6-edge>
</g6-graph>
```

The canvas will have the same size as the `g6-graph` tag so don't forget to set its height : 
```scss
g6-graph {
  height: 500px;
  width: 500px;
}
```

### G6TreeGraph
`G6TreeGraph` can have default config.

`g6.module.ts`
```typescript
import { G6TreeGraphModule, G6_TREE_GRAPH_OPTIONS } from 'ng-antv-g6';

@NgModule({
  exports: [ G6TreeGraphModule ],
  providers: [
    {
      provide: G6_TREE_GRAPH_OPTIONS,
      useValue: {
        modes: { default: ['zoom-canvas', 'drag-node'] },
        layout: {
          type: 'dendrogram',
          direction: 'LR',
        },
      }
    },
  ]
})
export class G6Module {}
```

Now you can use it in your template : 
```html
<g6-tree-graph>
  <g6-tree-node label="root">
    <g6-tree-node label="leaf_1"></g6-tree-node>
    <g6-tree-node label="leaf_2"></g6-tree-node>
  </g6-tree-node>
</g6-tree-graph>
```

⚠️ Due to an [angular issue](https://github.com/angular/angular/issues/14842), the tree graph won't work with dynamic node.
The example below **won't** work : ⚠️
```html
<g6-tree-graph>
  <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: node }"></ng-container>

  <!-- Root will be found as it's inside the graph -->
  <ng-template #nodeTpl let-node>
    <g6-tree-node>
      <ng-container *ngFor="let child of node.children">
        <!-- Doesn't work as nodeTpl is not in the g6-tree-node -->
        <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: child }"></ng-container>
      </ng-container>
    </g6-tree-node>
  </ng-template>

</g6-tree-graph>
```

### Menu
The Menu uses `@angular/cdk` for the overlay :
```
npm install @angular/cdk
```
And you need to import the style in 
`styles.scss`
```scss
@import '~@angular/cdk/overlay-prebuilt.css';
```

> If you're using @angular/material, you don't need to import it.

```html
<g6-graph>
  <ng-template #menu g6Menu let-node>
    <button (click)="delete(node.id)">Delete</button>
  </ng-template>
  <g6-node id="1" label="root" (contextmenu)="menu.open($event)"></g6-node>
</g6-graph>
```