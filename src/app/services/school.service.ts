import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { School } from '../models/school.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
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
    const school: School = data;
    return await this.http.post<{school:object | any}>(`${environment.apiUrl}/api/school/registerSchool`, school).toPromise()
      .then((res) => {
        this.authService.updateCurrentUser(res.school._id);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      })
  }

  async getSchoolBySAdminId(SAdminId: number){
    return await this.http.get(`${environment.apiUrl}/api/school/getSchoolBySAdminId?id=${SAdminId}`).toPromise();
  }

  setCurrentSchool(school: any){
    localStorage.setItem('currentSchool', JSON.stringify(school));
  }

  getCurrentSchool(){
    return JSON.parse(localStorage.getItem('currentSchool'));
  }
}
