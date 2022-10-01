import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';
import { SchoolService } from './school.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests = [
    {id: 1, description: 'Help in Business', date: '2022-10-08', time: '19:50', studentLevel: 'Diploma', expectedStudents: 20, status: 'NEW', sadminId: 3, requestDate: new Date().toISOString().split('T')[0]},
    {id: 2, description: 'Help in Water', date: '2022-10-18', time: '12:50', studentLevel: 'Diploma', expectedStudents: 30, status: 'NEW', sadminId: 3, requestDate: new Date().toISOString().split('T')[0]},
    {id: 3, description: 'Help in Fire', date: '2022-10-28', time: '21:50', studentLevel: 'Diploma', expectedStudents: 40, status: 'NEW', sadminId: 3, requestDate: new Date().toISOString().split('T')[0]},
    {id: 4, description: 'Help in Hot', date: '2022-12-03', time: '13:50', studentLevel: 'Diploma', expectedStudents: 50, status: 'NEW', sadminId: 3, requestDate: new Date().toISOString().split('T')[0]}
  ]
  constructor(public schoolService: SchoolService, public loginService: LoginService) { }


  addRequest(data: object | any){
    let request = {
      ...data,
      id: this.requests.length + 1,
      status: 'NEW',
      sadminId: this.loginService.getCurrentUser().id,
      requestDate: new Date().toISOString().split('T')[0]
    }
    this.requests.push(request)
  }

  getRequest(){return this.requests;}
}
