import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SchoolService } from './school.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests = [
    {id: 1, description: 'Help in Business', date: '2022-10-28', time: '8:50', studentLevel: 'Diploma', expectedStudents: 20, status: 'NEW', sadminId: 3, requestDate: '2022-10-3'},
    {id: 2, description: 'Help in Water', date: '2022-11-18', time: '12:50', studentLevel: 'Diploma', expectedStudents: 30, status: 'NEW', sadminId: 8, requestDate: '2022-3-12'},
    {id: 3, description: 'Help in Fire', date: '2022-1-1', time: '21:50', studentLevel: 'Diploma', expectedStudents: 40, status: 'NEW', sadminId: 9, requestDate: '2022-4-9'},
    {id: 4, description: 'Help in Hot', date: '2022-12-03', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'NEW', sadminId: 3, requestDate: '2022-11-1'},
    {id: 5, description: 'Help in Air', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'CLOSED', sadminId: 3, requestDate: '2022-12-22'},
    {id: 6, description: 'Help in Mizu', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'CLOSED', sadminId: 8, requestDate: '2022-1-23'},
    {id: 7, description: 'Help in Hono', date: '2022-11-18', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'NEW', sadminId: 8, requestDate: '2022-10-10'},
  ]
  constructor(public schoolService: SchoolService, public authService: AuthService) { }

  addRequest(data: object | any){
    let request = {
      ...data,
      id: this.requests.length + 1,
      status: 'NEW',
      sadminId: this.authService.getCurrentUser().id,
      requestDate: new Date().toISOString().split('T')[0]
    }
    this.requests.push(request)
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
