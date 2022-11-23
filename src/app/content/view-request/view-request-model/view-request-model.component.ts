import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
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
  offerValidity : any;
  btnToShow = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private router: Router, private viewRequestModel: MatDialog, private offerService: OfferService) { }

  ngOnInit(): void {
    this.dataInput = this.data;
    if(!this.currentUser) this.btnToShow = true;
    this.offerValidity = this.dataInput.offerStatus === 'yes' ? false : true;
  }

  submitOffer(){
    if(!this.currentUser) return this.notLoggedIn();

    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit Offer',
      heightAuto: false,
      input: 'textarea',
      inputPlaceholder: 'Enter your remarks here',
    }).fire({
      title: 'Are you sure you want to submit offer?',
      text: 'You will not be able to change your offer after submission.',
    }).then(async (result) => {
      if(!result.isConfirmed) return;
      //add offers
      const remarks = result.value;
      const check  = await this.offerService.addOffer(this.dataInput._id, remarks);
      const currentUrl = '/view-request';

      if (check){
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

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
      } else {
        Swal.mixin({
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        }).fire({
          title: 'Error Occured',
          text: 'Submit Failed.',
        })
      }




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
