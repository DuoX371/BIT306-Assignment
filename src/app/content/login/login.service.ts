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

  login(username: any, password: any){
    const user = this.users.find(u =>  u.username === username && u.password === password)
    if(user === undefined) return null
    this.setCurrentUser(user);
    return user;
  }

  registerVolunteer(username: any, password: any, fullname: any, email: any, phone:any, occupation:any, dateofbirth:any, userType:any){
    const user = this.users.push(username,password,fullname,email,phone,occupation,dateofbirth,userType)
    // console.log(username,password,fullname,email,phone,occupation,dateofbirth,userType)

    if(user === undefined) return null

    return user;
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
