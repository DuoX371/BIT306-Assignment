import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    {username: 'admin', password: 'admin', type: 'admin'},
    {username: 'user', password: 'user', type: 'volunteer'},
    {username: 'sadmin', password: 'sadmin', type: 'sadmin'},
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
    if(this.users.find(u => u.username === data['username']) !== undefined) return false;
    this.users.push(data);
    return true;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
