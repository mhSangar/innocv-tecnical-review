import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ApiService } from "../services/api.service";
import { User } from "../models/user";

import moment from "moment";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  now = moment();
  users: Observable<Array<User>>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.users = this.apiService.getUsers();
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
