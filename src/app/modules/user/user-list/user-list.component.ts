import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {
  faUser,
  faFilter,
  faPlus,
  faMinus,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

// services
import { ApiService } from "../services/api.service";

// models
import { User } from "../models/user";

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

  constructor(private apiService: ApiService, public router: Router) {
    this.searchString = "";
    this.selectedUsers = {};
    this.someSelected = false;
    this.allSelected = false;
  }

  ngOnInit() {
    this.users = this.apiService.getUsers();
  }

  /**
   * Toggles whether an user-ite is selec
   */
  toggleIsSelected(clickedUser) {
    const isSelected = this.selectedUsers[clickedUser.id];
    this.selectedUsers[clickedUser.id] = isSelected ? false : true;

    // get if any user is selected and how many
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

  clearSelection() {
    this.selectedUsers = {};
    this.selectedNbr = 0;
    this.someSelected = false;
    this.allSelected = false;
  }

  editSelectedUser() {
    const userId = Object.keys(this.selectedUsers).find((userId: string) => {
      return this.selectedUsers[userId];
    });

    this.router.navigate(["/user/", userId]);
  }

  deleteUser(userId: number, fetchUsers: boolean = false) {
    const promise = new Promise((resolve, reject) => {
      this.apiService.deleteUser(userId).subscribe(res => {
        if (fetchUsers) this.users = this.apiService.getUsers();

        resolve(true);
      });
    });

    return promise;
  }

  deleteSelectedUsers() {
    let finishedDeletes = 0;

    const promise = new Promise((resolve, reject) => {
      let usersToDelete = [];
      Object.keys(this.selectedUsers).forEach((userId: string) => {
        const parsedUserId = parseInt(userId);

        if (this.selectedUsers[userId]) {
          usersToDelete.push(parsedUserId);
        }
      });

      usersToDelete.forEach((userId: number) => {
        this.deleteUser(userId).then(() => {
          finishedDeletes += 1;
          if (finishedDeletes === usersToDelete.length) {
            this.users = this.apiService.getUsers();
            this.clearSelection();
          }
        });
      });
    });
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
