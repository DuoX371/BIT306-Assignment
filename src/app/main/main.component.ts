import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
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
  currentUser = this.authService.getCurrentUser();
  constructor(public mainService: MainService, public authService: AuthService, public router: Router) { }

  sideNavStatus = this.mainService.getSidenavOpen();

  ngOnInit(): void {
    //check if user is logged in
    const user = this.authService.getCurrentUser();
    if(user !== null) {

    }

    //nav bar state
    this.sideNavSub = this.mainService.getSidenavOpenUpdate().subscribe((status) => {
      this.sideNavStatus = status;
    })
  }

  //mobile change to over
}
