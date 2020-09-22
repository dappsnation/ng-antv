import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Route[] = [{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
},{
  path: 'doc',
  loadChildren: () => import('./doc/doc.module').then(m => m.DocModule)
},{
  path: 'graph',
  loadChildren: () => import('./graph/graph.module').then(m => m.GraphModule)
}]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
