import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/content/login/login.service';
import { MainService } from '../../main/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = this.loginService.getCurrentUser();

  constructor(public mainService: MainService, public loginService: LoginService, public router: Router) { }

  toggleSidenav() {
    this.mainService.toggleSidenav();
  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    //get current url
    if(this.router.url === '/'){
      switch (this.currentUser?.type) {
        case 'admin' : this.router.navigate(['register-school-admin']); break;
        case 'sadmin' : this.router.navigate(['register-school']); break;
        default: break;
      }
    }
  }

}
