import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editor-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLoad(e: any) {
    console.log('loaded', e)
  }

  onError(e: any) {
    console.log('onError', e)
  }
}
