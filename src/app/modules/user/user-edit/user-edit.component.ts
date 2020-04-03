import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  faUser,
  faSave,
  faChevronRight,
  faCalendarAlt,
  faUndoAlt
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { ApiService } from "../services/api.service";
import { DatepickerFormatService } from "../services/datepicker-format.service";
import { User } from "../models/user";

import { CorrectProcessModalComponent } from "../../shared/modals/correct-process-modal/correct-process-modal.component";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  // params
  userId: number;
  // attributes
  editedUserForm: FormGroup;
  originalUser: User;
  editedUser: User;
  now: Date;
  formSubmitAttempt: boolean;
  minSelectableDate: NgbDateStruct;
  maxSelectableDate: NgbDateStruct;
  // icons
  faUser = faUser;
  faSave = faSave;
  faChevronRight = faChevronRight;
  faCalendarAlt = faCalendarAlt;
  faUndo = faUndoAlt;

  constructor(
    private apiService: ApiService,
    public router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private dateFormatService: DatepickerFormatService
  ) {
    const tmpUserId = this.route.snapshot.paramMap.get("id");
    this.userId = parseInt(tmpUserId);
    this.editedUser = {
      id: null,
      name: null,
      birthdate: null
    };
    this.now = new Date();
    this.minSelectableDate = { year: 1900, month: 1, day: 1 };
    this.maxSelectableDate = {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getUTCDate()
    };
    this.formSubmitAttempt = false;
    this.editedUserForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.apiService.getUser(this.userId).subscribe((user: User) => {
      this.editedUser = user;
      this.originalUser = JSON.parse(JSON.stringify(user)) ;
      this.updateFormValues();
    });

    this.updateFormValues();
  }

  updateFormValues() {
    this.editedUserForm = new FormGroup({
        name: new FormControl(this.editedUser.name, [Validators.required]),
        birthdate: new FormControl(
          this.dateFormatService.stringToDatepicker(this.editedUser.birthdate),
          [Validators.required]
        )
      });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.editedUserForm.valid) {
      const formResult = this.editedUserForm.value;
      const user: User = {
        id: this.userId,
        name: formResult.name,
        birthdate: this.dateFormatService.datepickerToString(
          formResult.birthdate
        )
      };

      console.log({ form: this.editedUserForm.value, user: user });

      this.apiService.updateUser(user).subscribe(res => {
        this.resetForm();
        this.openCorrectProcessModal(user);

        // once the user is created, we navigate back to user-list
        this.router.navigate(["/user"]);
      });
    }
  }

  onUndoChanges() {
    const formOriginalValue = {
      name: this.originalUser.name,
      birthdate: this.originalUser.birthdate,
    }

    this.editedUserForm.setValue(formOriginalValue);
  }

  openCorrectProcessModal(user: User) {
    const modalRef = this.modalService.open(CorrectProcessModalComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
      size: "md",
      windowClass: "modal-holder"
    });
    modalRef.componentInstance.process = "userEdited";
    modalRef.componentInstance.name = user.name;
    modalRef.componentInstance.id = user.id;
    modalRef.componentInstance.date = user.birthdate;

    setTimeout(() => {
      modalRef.componentInstance.onClose();
    }, 4000);
  }

  resetForm() {
    this.editedUserForm.reset();
    this.formSubmitAttempt = false;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
