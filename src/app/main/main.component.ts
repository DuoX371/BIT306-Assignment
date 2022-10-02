import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../content/login/auth.service';
import { MainService } from './main.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private sideNavSub: Subscription = new Subscription();
  currentUser = this.loginService.getCurrentUser();
  constructor(public mainService: MainService, public loginService: LoginService, public router: Router) { }

  sideNavStatus = this.mainService.getSidenavOpen();

  ngOnInit(): void {
    //check if user is logged in
    const user = this.loginService.getCurrentUser();
    if(user !== null) {

    }

    //nav bar state
    this.sideNavSub = this.mainService.getSidenavOpenUpdate().subscribe((status) => {
      this.sideNavStatus = status;
    })
  }

  //mobile change to over
}
