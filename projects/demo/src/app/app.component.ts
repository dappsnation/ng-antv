import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nodes = new Array(30)
    .fill(null)
    .map(() => Math.round(Math.random() * 1000).toString());
}
