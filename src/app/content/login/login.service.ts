import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    {id: 1, username: 'admin', password: 'admin', type: 'admin'},
    {id: 2, username: "user", password:"user", fullname: "User1", email:"user@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2022-09-07", type:"volunteer"},
    {id: 3, username: "sadmin", password:"sadmin", confirmPassword:"sadmin", fullname:"School Admin 1", email:"sadmin@a.a", phone:"0122309882", staffid:"S01", position: "Manager", type:"sadmin", schoolId: 1},
    {id: 4, username: "jhjh", password:"user", fullname: "JH JH", email:"xd@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"1990-09-07", type:"volunteer"},
    {id: 5, username: "xd", password:"user", fullname: "XD", email:"usadsaer@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2012-09-07", type:"volunteer"},
    {id: 6, username: "luluser", password:"user", fullname: "LUL USer", email:"usdsadsaer@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"1980-09-07", type:"volunteer"},
    {id: 7, username: "jiaddd", password:"user", fullname: "Jiadd", email:"zzzz@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2001-09-07", type:"volunteer"},
  ]

  private currentUser = null;

  constructor() { }

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
    data['id'] = this.users.length + 1;
    if(this.users.find(u => u.username === data['username']) !== undefined) return false; //username exist
    this.users.push(data);
    return true;
  }

  registerSchoolAdmin(data: any | object){
    data['type'] = 'sadmin';
    data['id'] = this.users.length + 1;
    data['schoolId'] = null;
    if(this.users.find(u => u.username === data['username']) !== undefined) return false; //username exist
    this.users.push(data);
    return true;
  }

  updateSchoolId(id: number){
    this.users.find(u => u.id === this.currentUser.id).schoolId = id;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
