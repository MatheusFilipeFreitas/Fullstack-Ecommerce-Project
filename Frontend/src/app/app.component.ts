import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  showSearch: boolean = false;
  title = 'Frontend';

  constructor() {

  }

  ngOnInit(): void {}

  // Search methods
  showSearchBar() {
    this.showSearch = true;
  }

  hideSearchBar() {
    this.showSearch = false;
  }
}
