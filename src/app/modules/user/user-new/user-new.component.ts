import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faUser,
  faPlus,
  faChevronRight,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

// services
import { ApiService } from "../services/api.service";
import { DatepickerFormatService } from "../services/datepicker-format.service";

// models
import { User } from "../models/user";

// modal component
import { CorrectProcessModalComponent } from "../../shared/modals/correct-process-modal/correct-process-modal.component";

@Component({
  selector: "app-user-new",
  templateUrl: "./user-new.component.html",
  styleUrls: ["./user-new.component.scss"]
})
export class UserNewComponent implements OnInit {
  // attributes
  newUserForm: FormGroup;
  newUser: User;
  now: Date;
  formSubmitAttempt: boolean;
  minSelectableDate: NgbDateStruct;
  maxSelectableDate: NgbDateStruct;
  // icons
  faUser = faUser;
  faPlus = faPlus;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalService: NgbModal,
    private dateFormatService: DatepickerFormatService
  ) {
    this.newUser = { id: null, name: null, birthdate: null };
    this.now = new Date();

    // set min/max dates to select on date picker
    this.minSelectableDate = {
      year: 1900,
      month: 1,
      day: 1
    };
    this.maxSelectableDate = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getUTCDate()
    };
  }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl(this.newUser.name, [Validators.required]),
      birthdate: new FormControl(this.newUser.birthdate, [Validators.required])
    });
  }

  onSubmit() {
    if (!this.newUserForm.valid) return;
    this.formSubmitAttempt = true;

    const formResult = this.newUserForm.value;
    const user: User = {
      id: null,
      name: formResult.name,
      birthdate: this.dateFormatService.datepickerToString(formResult.birthdate)
    };

    // console.log({ form: this.newUserForm.value, user: user });

    this.apiService.createUser(user).subscribe(res => {
      // assign a hardcoded ID because mock API does not return an ID
      user.id = res.id || 3492;
      // clean form 
      this.resetForm();
      // open pop-up informing the user about the correct operation
      this.openCorrectProcessModal(user);

      // finally, navigate back to user-list
      this.router.navigate(["/user"]);
    });
  }

  openCorrectProcessModal(user: User) {
    // open modal
    const modalRef = this.modalService.open(CorrectProcessModalComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
      size: "md",
      windowClass: "modal-holder"
    });

    // set modal parameters
    modalRef.componentInstance.process = "userAdded";
    modalRef.componentInstance.name = user.name;
    modalRef.componentInstance.id = user.id;

    // auto-close modal after 3 seconds
    setTimeout(() => {
      modalRef.componentInstance.onClose();
    }, 3000);
  }

  resetForm() {
    this.newUserForm.reset();
    this.formSubmitAttempt = false;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
