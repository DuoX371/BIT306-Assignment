import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(public authService: AuthService, public http: HttpClient) { }

  async getOfferByRequestId(requestId: number){
    return await this.http.get(`${environment.apiUrl}/api/offer/getOfferByRequestId?id=${requestId}`).toPromise()
  }

  async approveOffer(offerId: number){
    await this.http.post(`${environment.apiUrl}/api/offer/approveOffer`, {id: offerId}).toPromise()
  }


  async addOffer(requestId: string, remarks: string){
    const user = this.authService.getCurrentUser();
    let offer = {
      remarks: remarks,
      status: 'PENDING',
      requestId: requestId,
      volunId: user._id
    }
    
    return await this.http.post(`${environment.apiUrl}/api/offer/addOffer`, offer).toPromise()
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

  async getMyOffers(){
    return await this.http.get(`${environment.apiUrl}/api/offer/getMyOffers?userId=${this.authService.getCurrentUser()._id}`).toPromise()
  }
}
