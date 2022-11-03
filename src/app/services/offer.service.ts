import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(public authService: AuthService, public http: HttpClient) { }

  async getOfferByRequestId(requestId: number){
    // return this.offers.filter(offer => offer.requestId === requestId);
    return await this.http.get(`${environment.apiUrl}/api/offer/getOfferByRequestId?id=${requestId}`).toPromise()
  }

  async approveOffer(offerId: number){
    await this.http.post(`${environment.apiUrl}/api/offer/approveOffer`, {id: offerId}).toPromise()
    // let offer = this.offers.find(offer => offer.id === offerId);
    // offer.status = 'APPROVED';
  }

  addOffer(requestId: string, remarks: string){
    // const user = this.authService.getCurrentUser();
    // let offer = {
    //   id: this.offers.length + 1,
    //   remarks: remarks,
    //   status: 'PENDING',
    //   requestId: parseInt(requestId),
    //   volunId: user.id
    // }
    // this.offers.push(offer);
  }

  async getMyOffers(){
    return await this.http.get(`${environment.apiUrl}/api/offer/getMyOffers?userId=${this.authService.getCurrentUser()._id}`).toPromise()
  }
}
