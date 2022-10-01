import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';
import { SchoolService } from './school.service';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests = [
    {description: 'Help in Business', date: '2022-10-08', time: '13:50', studentLevel: 'Diploma', expectedStudents: 20, id: 1},
    {description: 'Help in Water', date: '2022-10-08', time: '13:50', studentLevel: 'Diploma', expectedStudents: 20, id: 2},
    {description: 'Help in Fire', date: '2022-10-08', time: '13:50', studentLevel: 'Diploma', expectedStudents: 20, id: 3},
    {description: 'Help in Hot', date: '2022-10-08', time: '13:50', studentLevel: 'Diploma', expectedStudents: 20, id: 4}
  ]
  constructor(public schoolService: SchoolService, public loginService: LoginService) { }


  addRequest(data: object | any){
    data['id'] = this.requests.length + 1;
    data['admin'] = this.loginService.getCurrentUser().id;
    this.requests.push(data)
  }

  getRequest(){return this.requests;}
}
