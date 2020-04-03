import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { faUser, faFilter } from "@fortawesome/free-solid-svg-icons";

import { ApiService } from "../services/api.service";
import { User } from "../models/user";

import moment from "moment";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  // attributes
  users: Observable<User[]>;
  searchString: string;
  // icons
  faUser = faUser;
  faFilter = faFilter;

  constructor(private apiService: ApiService) {
    this.searchString = "";
  }

  ngOnInit() {
    this.users = this.apiService.getUsers();
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
