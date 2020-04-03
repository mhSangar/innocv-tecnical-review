import { Component, OnInit } from "@angular/core";
import { faUser, faPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-user-new",
  templateUrl: "./user-new.component.html",
  styleUrls: ["./user-new.component.scss"]
})
export class UserNewComponent implements OnInit {
  // attributes
  // icons
  faUser = faUser;
  faPlus = faPlus;
  faChevronRight = faChevronRight;

  constructor() {}

  ngOnInit() {}
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
