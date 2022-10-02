import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-request-model',
  templateUrl: './view-request-model.component.html',
  styleUrls: ['./view-request-model.component.css']
})
export class ViewRequestModelComponent implements OnInit {
  dataInput : any;
  currentUser = this.authService.getCurrentUser();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private router: Router, private viewRequestModel: MatDialog) { }

  ngOnInit(): void {
    this.dataInput = this.data;
    console.log(this.dataInput);
  }

  submitOffer(){
    if(!this.currentUser) return this.notLoggedIn();
    console.log(this.currentUser)
    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit Offer',
      heightAuto: false,
    }).fire({
      title: 'Are you sure you want to submit offer?',
      text: 'You will not be able to change your offer after submission.',
    }).then((result) => {
      if(!result.isConfirmed) return;
      Swal.mixin({
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
        heightAuto: false,
        timer: 3000,
      }).fire({
        title: 'Offer submitted successfully!',
        text: 'You will be notified once the request is accepted.',
      }).then(() => {
        this.viewRequestModel.closeAll();
      })
    })

    return true;
  }

  async notLoggedIn(){
    return Swal.mixin({
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Login now!',
      heightAuto: false,
    }).fire({
      title: 'You are currently not logged in. Please login to continue!',
    }).then((result) => {
      if(!result.isConfirmed) return
      this.router.navigate(['/login']);
      this.viewRequestModel.closeAll();
    })
  }
}
