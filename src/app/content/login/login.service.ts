import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    {id: 1, username: 'admin', password: 'admin', type: 'admin'},
    {id: 2, username: "user", password:"user", fullname: "User1", email:"user@u.u", phone:"0122309882", occupation:"Doctor", dateofbirth:"2022-09-07", type:"volunteer"},
    {id: 3, username: "sadmin", password:"sadmin", confirmPassword:"sadmin", fullname:"School Admin 1", email:"sadmin@a.a", phone:"0122309882", staffid:"S01", position: "Manager", type:"sadmin"}
  ]

  private currentUser = null;

  constructor() { }

  getCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUser =  JSON.stringify(this.currentUser) === '{}' ? null : this.currentUser;
    return this.currentUser;
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
    if(this.users.find(u => u.username === data['username']) !== undefined) return false; //username exist
    this.users.push(data);
    return true;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
