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
  private requests = [
    {id: 1, description: 'Help in Business', date: '2022-10-28', time: '8:50', studentLevel: 'Diploma', expectedStudents: 20, status: 'NEW', sadminId: 3, requestDate: '2022-10-3'},
    {id: 2, description: 'Help in Something', date: '2022-11-18', time: '12:50', studentLevel: 'Diploma', expectedStudents: 30, status: 'NEW', sadminId: 8, requestDate: '2022-3-12'},
    {id: 3, description: 'Help in Lmao', date: '2022-1-1', time: '21:50', studentLevel: 'Diploma', expectedStudents: 40, status: 'NEW', sadminId: 9, requestDate: '2022-4-9'},
    {id: 4, description: 'Help in Xd', date: '2022-12-03', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'NEW', sadminId: 3, requestDate: '2022-11-1'},
    {id: 5, description: 'Help in Air', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'CLOSED', sadminId: 3, requestDate: '2022-12-22'},
    {id: 6, description: 'Help in .-.', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'CLOSED', sadminId: 8, requestDate: '2022-1-23'},
    {id: 7, description: 'Help in Hono', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'NEW', sadminId: 8, requestDate: '2022-10-10'},
  ]
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
    // this.requests.push(request)
  }

  getAllRequest(){return this.requests;}
  getAllNewRequest(){return this.requests.filter(request => request.status === 'NEW');}

  getSelfRequest(){return this.requests.filter(request => request.sadminId === this.authService.getCurrentUser().id);}

  getSchoolByRequestID(requestId: number){
    let request = this.requests.find(request => request.id === requestId);
    return this.schoolService.getSchoolBySAdminId(request.sadminId);
  }

  closeRequest(requestId: number){
    let user = this.authService.getCurrentUser();
    let request = this.requests.find(request => request.id === requestId && request.sadminId === user.id);
    if(request === undefined) return false;
    request.status = 'CLOSED';
    return true;
  }
}
