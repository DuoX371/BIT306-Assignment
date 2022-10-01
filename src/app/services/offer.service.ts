import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(public loginService: LoginService) { }
}
