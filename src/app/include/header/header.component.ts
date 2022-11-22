import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../../main/main.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = this.authService.getCurrentUser();

  constructor(public mainService: MainService, public authService: AuthService, public router: Router) { }

  toggleSidenav() {
    this.mainService.toggleSidenav();
  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout();
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
