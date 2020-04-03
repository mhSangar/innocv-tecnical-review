import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  faUser,
  faFilter,
  faPlus,
  faMinus,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

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
  someSelected: boolean;
  allSelected: boolean;
  selectedUsers: Object;
  selectedNbr: number;
  // icons
  faUser = faUser;
  faFilter = faFilter;
  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private apiService: ApiService) {
    this.searchString = "";
    this.selectedUsers = {};
    this.someSelected = false;
    this.allSelected = false;
  }

  ngOnInit() {
    this.users = this.apiService.getUsers();
  }

  toggleIsSelected(clickedUser) {
    const isSelected = this.selectedUsers[clickedUser.id];
    this.selectedUsers[clickedUser.id] = isSelected ? false : true;

    // get if any selected and how many
    let tmpSelectedNbr = 0;
    Object.keys(this.selectedUsers).forEach(userId => {
      if (this.selectedUsers[userId]) {
        tmpSelectedNbr += 1;
      }
    });
    this.selectedNbr = tmpSelectedNbr;
    this.someSelected = tmpSelectedNbr > 0;

    // get if all selected
    this.users.subscribe(users => {
      this.allSelected = users.length === tmpSelectedNbr;
    });
  }

  toggleAllUsers() {
    this.users.subscribe(users => {
      users.forEach(user => {
        this.selectedUsers[user.id] = !this.someSelected;
      });

      this.someSelected = !this.someSelected;
    });
  }

  deselectAllUsers() {
    this.users.subscribe(users => {
      users.forEach(user => {
        this.selectedUsers[user.id] = false;
      });

      this.someSelected = false;
    });
  }

  clearSelection() {
    console.log("hmm");

    this.selectedUsers = {};
    this.selectedNbr = 0;
    this.someSelected = false;
    this.allSelected = false;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
