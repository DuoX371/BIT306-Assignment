import { Injectable } from '@angular/core';
import { SchoolAdmin } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    {id: 1, username: 'admin', password: 'admin', type: 'admin'},
    {id: 2, username: "user", password:"user", fullname: "User1", email:"user@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2022-09-07", type:"volunteer"},
    {id: 3, username: "sadmin", password:"sadmin", confirmPassword:"sadmin", fullname:"School Admin 1", email:"sadmin@a.a", phone:"0122309882", staffid:"S01", position: "Manager", type:"sadmin", schoolId: 1},
    {id: 4, username: "jhjh", password:"user", fullname: "JH JH", email:"xd@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"1990-09-07", type:"volunteer"},
    {id: 5, username: "xd", password:"user", fullname: "XD", email:"usadsaer@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2012-09-07", type:"volunteer"},
    {id: 6, username: "luluser", password:"user", fullname: "LUL USer", email:"usdsadsaer@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"1980-09-07", type:"volunteer"},
    {id: 7, username: "jiaddd", password:"user", fullname: "Jiadd", email:"zzzz@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2001-09-07", type:"volunteer"},
    {id: 8, username: "sadmin2", password:"sadmin2", confirmPassword:"sadmin2", fullname:"School Admin 2", email:"sadmin2@a.a", phone:"0122309882", staffid:"S02", position: "Noober Manager", type:"sadmin", schoolId: 2},
    {id: 9, username: "leadmin", password:"leadmin", confirmPassword:"leadmin", fullname:"School Admin 3", email:"leadmin@a.a", phone:"0122309882", staffid:"S03", position: "Lol Manager", type:"sadmin", schoolId: 3},
  ]

  private currentUser = null;

  constructor(private http: HttpClient) { }

  getCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUser =  JSON.stringify(this.currentUser) === '{}' ? null : this.currentUser;
    return this.currentUser;
  }

  getUserById(id: number){
    return this.users.find(u => u.id === id);
  }

  setCurrentUser(user: any){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  login(data: any | object){
    const user = this.users.find(u =>  u.username === data.username && u.password === data.password)
    if(user === undefined) return null
    this.setCurrentUser(user);
    return user;
  }

  registerVolunteer(data: any | object){
    data['type'] = 'volunteer';
    console.log(data);
    // data['id'] = this.users.length + 1;
    // if(this.users.find(u => u.username === data['username']) !== undefined) return false; //username exist
    // this.users.push(data);
    return true;
  }

  async registerSchoolAdmin(data: any | object){
    data['type'] = 'sadmin';
    const sadmin: SchoolAdmin = data;
    return await this.http.post(`${environment.apiUrl}/api/auth/registerSchoolAdmin`, sadmin).toPromise()
      .then((res) => {
        console.log(res);
        return true;
      }).catch((err) => {
        console.log(err);
        return false;
      })
    // if(this.users.find(u => u.username === data['username']) !== undefined) return false; //username exist
  }


  getAllUsers(){
    return this.users;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
