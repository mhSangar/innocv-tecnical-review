import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ErrorModalComponent } from "./modules/shared/modals/error-modal/error-modal.component";

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private modalService: NgbModal) {}

  openModal(content) {
    this.modalService.open(content);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorStatus = "";
        let errorMessage = "";

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message;
        } else {
          // server-side error
          errorStatus = `${error.status} - `;
        }

        // launch modal
        if (error.status !== 200) {}
        
        const modalRef = this.modalService.open(ErrorModalComponent, {
          ariaLabelledBy: "modal-basic-title",
          centered: true,
          size: "md",
          windowClass: "newUserModalClass"
        });
        modalRef.componentInstance.message = errorMessage;
        modalRef.componentInstance.status = errorStatus;

        console.log({
          errorMessage: errorMessage,
          errorStatus: errorStatus
        });

        return throwError(errorMessage);
      })
    );
  }
}
