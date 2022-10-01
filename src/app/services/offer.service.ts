import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offers = [
    {id: 1, remarks: 'Nice XD', status: 'PENDING', requestId: 2, volunId: 2},
    {id: 2, remarks: 'LmOA', status: 'PENDING', requestId: 3, volunId: 2}
  ]
  constructor(public loginService: LoginService) { }
}
