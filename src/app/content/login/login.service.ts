import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users = [
    {username: 'admin', password: 'admin', type: 'admin'},
    {username: 'user', password: 'user', type: 'volunteer'},
    {username: 'school', password: 'school', type: 'sadmin'},
  ]

  private currentUser = null;

  constructor() { }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentUser(user: any){
    this.currentUser = user;
  }

  login(username: any, password: any){
    const user = this.users.find(u =>  u.username === username && u.password === password)
    this.setCurrentUser(user === undefined ? null : user);
    return user === undefined ? null : user;
  }

  logout(){
    this.currentUser = null;
  }
}
