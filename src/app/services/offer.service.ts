import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

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
  constructor(public authService: AuthService) { }

  getOfferByRequestId(requestId: number){
    return this.offers.filter(offer => offer.requestId === requestId);
  }

  approveOffer(offerId: number){
    let offer = this.offers.find(offer => offer.id === offerId);
    offer.status = 'APPROVED';
  }

  addOffer(requestId: string, remarks: string){
    const user = this.authService.getCurrentUser();
    let offer = {
      id: this.offers.length + 1,
      remarks: remarks,
      status: 'PENDING',
      requestId: parseInt(requestId),
      volunId: user.id
    }
    this.offers.push(offer);
  }

  checkOfferValid(requestId: number){
    const user = this.authService.getCurrentUser();
    let offer = this.offers.find(offer => offer.volunId === user.id && offer.requestId === requestId);
    console.log(offer)
    return offer === undefined;
  }

  getUserOffer(requestId: number){
    const user = this.authService.getCurrentUser();
    return this.offers.find(offer => offer.volunId === user.id && offer.requestId === requestId);
  }
}
