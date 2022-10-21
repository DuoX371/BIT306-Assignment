import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private schools = [
    {id: 1, name: 'Genshin Impact School', address: 'Taman Bunga Tanjung', city: 'Kuala Lumpur', sadminId: 3},
    {id: 2, name: 'Monkas', address: 'Taman Superman', city: 'Pahang', sadminId: 8},
    {id: 3, name: 'Cake', address: 'Taman Ultrama', city: 'Pahang', sadminId: 9}
  ]

  constructor(private authService: AuthService, public http: HttpClient) { }

  async getSadminSchool(){
    if(localStorage.getItem('currentSchool') !== null) return this.getCurrentSchool();
    const user = this.authService.getCurrentUser();
    if(user.schoolId === undefined) return null;
    const school = await this.http.get<{school: object}>(`${environment.apiUrl}/api/school/getSAdminSchool?id=${user.schoolId}`).toPromise()
      .then(res => {
        return res.school;
      }).catch(err => {
        console.log(err)
      })
    this.setCurrentSchool(school);
    return school;
  }

  async registerSchool(data: object | any){
    data['sadminId'] = this.authService.getCurrentUser()._id;
    return await this.http.post<{school:object | any}>(`${environment.apiUrl}/api/school/registerSchool`, data).toPromise()
      .then((res) => {
        this.authService.updateCurrentUser(res.school._id);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  }

  getSchoolBySAdminId(SAdminId: number){
    return this.schools.find(s => s.sadminId === SAdminId);
  }

  setCurrentSchool(school: any){
    localStorage.setItem('currentSchool', JSON.stringify(school));
  }

  getCurrentSchool(){
    return JSON.parse(localStorage.getItem('currentSchool'));
  }
}
