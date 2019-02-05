import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() create = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onCreateMovie(event) {
    this.create.emit(event);
  }
}
