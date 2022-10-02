import { Injectable } from '@angular/core';
import { LoginService } from '../content/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools = [
    {id: 1, name: 'Genshin Impact School', address: 'Taman Bunga Tanjung', city: 'Kuala Lumpur', sadminId: 3}
  ]

  constructor(private loginService: LoginService) { }

  getSadminSchool(){
    const user = this.loginService.getCurrentUser();
    return this.schools.find(e => {return e.sadminId === user.id})
  }

  registerSchool(data: object | any){
    data['admin'] = this.loginService.getCurrentUser().username
    data['id'] = this.schools.length + 1
    this.schools.push(data)
  }
}
