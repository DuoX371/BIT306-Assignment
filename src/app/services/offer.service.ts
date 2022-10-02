import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offers = [
    {id: 1, remarks: 'Nice XD', status: 'PENDING', requestId: 2, volunId: 2},
    {id: 2, remarks: 'LmOA', status: 'PENDING', requestId: 3, volunId: 4},
    {id: 3, remarks: 'eres', status: 'PENDING', requestId: 3, volunId: 5},
    {id: 4, remarks: 'i wan help', status: 'PENDING', requestId: 3, volunId: 6},
    {id: 5, remarks: 'tolong lu', status: 'PENDING', requestId: 3, volunId: 7},
    {id: 6, remarks: 'terima kasi', status: 'PENDING', requestId: 2, volunId: 4},
    {id: 7, remarks: 'okokook', status: 'PENDING', requestId: 1, volunId: 2},
    {id: 8, remarks: 'lololo', status: 'PENDING', requestId: 1, volunId: 6},
    {id: 9, remarks: 'xdxdxdx', status: 'PENDING', requestId: 1, volunId: 7},
  ]
  constructor(public loginService: LoginService) { }

  getOfferByRequestId(requestId: number){
    return this.offers.filter(offer => offer.requestId === requestId);
  }
}
