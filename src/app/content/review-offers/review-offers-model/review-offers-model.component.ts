import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  loading = true;
  dataInput : any;
  offers : any = [];
  displayedColumns: string[] = ['id', 'remarks', 'status', 'volunteer', 'age', 'occupation'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public offerService: OfferService, public authService: AuthService, public requestService: RequestService, public dialogRef: MatDialogRef<any>) { }

  async ngOnInit(): Promise<void> {
    this.dataInput = this.data;
    this.offers = await this.offerService.getOfferByRequestId(this.dataInput._id)
    this.loading = false;

    if(!this.offers.length) {
      console.log(this.offers);
      console.log('No offers found');
      this.dialogRef.updateSize('30%', 'auto');
    }
  }

  clickedRow(data: any | object){
    if(data.status === 'ACCEPTED') return;
    Swal.mixin({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve!',
      heightAuto: false,
      confirmButtonColor: 'green',
    }).fire({
      title: 'Are you sure?',
      text: `Approve offer by ${data.volunteer}?`,
    }).then(async (result) => {
      if(!result.isConfirmed) return
      // loading spinner
      Swal.fire({
        title: 'Approving offer',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        heightAuto: false,
        didOpen: () => Swal.showLoading(),
      })
      await this.offerService.approveOffer(data._id);
      Swal.close()
      //reload the data and update the table
      // either direct update the front end or reload the data by fetching the api again
      data.status = 'ACCEPTED';
      // this.offers = await this.offerService.getOfferByRequestId(this.dataInput._id)
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
      text: `Close request Request ID: ${this.dataInput._id}?`,
    }).then(async (result) => {
      if(!result.isConfirmed) return
      if(await this.requestService.closeRequest(this.dataInput._id)){
        Swal.mixin({
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          heightAuto: false,
          timer: 3000,
        }).fire({
          title: 'Request closed successfully!',
        })
        this.dataInput.status = 'CLOSED';
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
