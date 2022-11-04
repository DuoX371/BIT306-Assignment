import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { AuthService } from "./auth.service";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest).pipe(
      catchError( res => {
        if(res.error.error === 'jwt expired'){
          Swal.mixin({
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
          }).fire({
            title: 'Session timed out',
            text: 'Please re-login to continue',
          }).then(() => {
            this.router.navigate(['login']);
            this.authService.logout();
          })
        }
        throw new Error(res);
      })
     )
  }
}
