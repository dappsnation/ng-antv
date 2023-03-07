import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  nodes = new Array(10).fill(null).map(() => Math.round(Math.random() * 1000)).sort().map(node => node.toString());
}
