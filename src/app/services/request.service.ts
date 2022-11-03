import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request.model';
import { AuthService } from './auth.service';
import { SchoolService } from './school.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(public schoolService: SchoolService, public authService: AuthService, public http: HttpClient) { }

  async addRequest(data: object | any){
    let request = {
      ...data,
      status: 'NEW',
      sadminId: this.authService.getCurrentUser()._id,
      requestDate: new Date().toISOString().split('T')[0]
    }
    const reqData: Request = request;
    return await this.http.post(`${environment.apiUrl}/api/request/submitRequest`, reqData).toPromise()
      .then(res => {
        console.log(res);
        return true;
      })
      .catch(err => {
        console.log(err);
        return false;
      })
  }

  async getAllNewRequest(){
    //to check if user is logged in and if the user has that offer
    const user = this.authService.getCurrentUser();
    return await this.http.get(`${environment.apiUrl}/api/request/getAllNewRequests${user !== null && user?.type === 'volunteer' ? `?userId=${user._id}` : ''}`).toPromise()
  }

  async getSelfRequest(){return await this.http.get(`${environment.apiUrl}/api/request/getSelfRequest?sadminId=${this.authService.getCurrentUser()._id}`).toPromise()}

  async closeRequest(requestId: number){
    let user = this.authService.getCurrentUser();
    await this.http.post(`${environment.apiUrl}/api/request/closeRequest`, {requestId: requestId, userId: user}).toPromise()
    return true;
  }
}
