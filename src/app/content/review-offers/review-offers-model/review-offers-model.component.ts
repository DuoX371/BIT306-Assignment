import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferService } from 'src/app/services/offer.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-review-offers-model',
  templateUrl: './review-offers-model.component.html',
  styleUrls: ['./review-offers-model.component.css']
})
export class ReviewOffersModelComponent implements OnInit {
  dataInput : any;
  offers : any;
  displayedColumns: string[] = ['id', 'remarks', 'status', 'volunteer', 'age', 'occupation'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public offerService: OfferService, public authService: AuthService, public requestService: RequestService) { }

  ngOnInit(): void {
    this.dataInput = this.data;
    this.offers = this.offerService.getOfferByRequestId(this.dataInput.id)
    if(!this.offers) return

    this.offers = this.offers.map(o => {
      const user = this.authService.getUserById(o.volunId);
      // add volunteer info
      o['volunteer'] = user.fullname;
      o['age'] = new Date().getFullYear() - parseInt(user.dateofbirth.split('-')[0]) ;
      o['occupation'] = user.occupation;
      return o;
    })
  }

  clickedRow(data: any | object){
    if(data.status === 'APPROVED') return;
    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve!',
      heightAuto: false,
      confirmButtonColor: 'green',
    }).fire({
      title: 'Are you sure?',
      text: `Approve offer by ${data.volunteer}?`,
    }).then((result) => {
      if(!result.isConfirmed) return
      this.offerService.approveOffer(data.id);
    })
  }

  closeRequest(){
    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Close!',
      heightAuto: false,
      confirmButtonColor: 'green',
    }).fire({
      title: 'Are you sure?',
      text: `Close request Request ID: ${this.dataInput.id}?`,
    }).then((result) => {
      if(!result.isConfirmed) return
      if(this.requestService.closeRequest(this.dataInput.id)){
        Swal.mixin({
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        }).fire({
          title: 'Request closed successfully!',
        })
      }else{
        Swal.mixin({
          icon: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        }).fire({
          title: 'Error closing request!',
        })
      }

    })
  }

}
