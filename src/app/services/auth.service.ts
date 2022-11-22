import { Injectable } from '@angular/core';
import { SchoolAdmin, Volunteer } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = null;
  private token: string;

  constructor(private http: HttpClient) { }

  getToken(){
    this.token = localStorage.getItem('token') || '';
    return this.token;
  }

  getCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUser =  JSON.stringify(this.currentUser) === '{}' ? null : this.currentUser;
    return this.currentUser;
  }

  setCurrentUser(user: any){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  updateCurrentUser(schoolId: string){
    const user = this.getCurrentUser();
    user.schoolId = schoolId;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  updateCurrentUserPfp(base64: string){
    const user = this.getCurrentUser();
    user.pfp = base64;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  async login(data: any | object){
    const result = await this.http.post(`${environment.apiUrl}/api/auth/login`, data).toPromise()
      .then((res) => {
        // console.log(res);
        return res;
      }).catch((err) => {
        // console.log(err);
        return null;
      })
    if(result === null) return null;
    this.token = result.token
    localStorage.setItem('token', this.token);
    this.setCurrentUser(result.user);
    return result.user;
  }

  async registerVolunteer(data: any | object){
    data['type'] = 'volunteer';
    const volunteer: Volunteer = data;
    return await this.http.post(`${environment.apiUrl}/api/auth/registerVolunteer`, volunteer).toPromise()
      .then((res) => {
        return {register: true, message: ``};
      })
      .catch((err) => {
        const error = err.error
        console.log(err)
        if(error.username) return {register: false, message: `Username already exist`}
        if(error.email) return {register: false, message: `Email already exist`}
        return {register: false, message: `An error has occured. Please check the logs.`}
      });
  }

  async registerSchoolAdmin(data: any | object){
    data['type'] = 'sadmin';
    const sadmin: SchoolAdmin = data;
    return await this.http.post(`${environment.apiUrl}/api/auth/registerSchoolAdmin`, sadmin).toPromise()
      .then((res) => {
        return {register: true, message: ``};
      }).catch((err) => {
        const error = err.error
        if(error.username) return {register: false, message: `Username already exist`}
        if(error.email) return {register: false, message: `Email already exist`}
        return {register: false, message: `An error has occured. Please check the logs.`}
      })
  }

  async updateUserPassword(data: any | object){
    return await this.http.put(`${environment.apiUrl}/api/auth/updateUserPassword`, data).toPromise()
      .then((res) => {
        return {success: true, message: ``};
      }).catch((err) => {
        return {success: false, message: err.error.message};
      })
  }

  async getAllUsers(){
    return await this.http.get(`${environment.apiUrl}/api/auth/getAllUsers`).toPromise()
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentSchool');
    localStorage.removeItem('token');
    this.currentUser = null;
  }
}
