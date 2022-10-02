import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools = [
    {id: 1, name: 'Genshin Impact School', address: 'Taman Bunga Tanjung', city: 'Kuala Lumpur', sadminId: 3}
  ]

  constructor(private authService: AuthService) { }

  getSadminSchool(){
    const user = this.authService.getCurrentUser();
    return this.schools.find(e => {return e.sadminId === user.id})
  }

  registerSchool(data: object | any){
    data['sadminId'] = this.authService.getCurrentUser().id
    data['id'] = this.schools.length + 1
    this.authService.getCurrentUser()['school'] = data.id
    this.schools.push(data)
  }

  getSchoolBySAdminId(SAdminId: number){
    return this.schools.find(s => s.sadminId === SAdminId);
  }
}
