import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { RequestService } from 'src/app/services/request.service';
import { SchoolService } from 'src/app/services/school.service';
import { ReviewOffersModelComponent } from './review-offers-model/review-offers-model.component';

@Component({
  selector: 'app-review-offers',
  templateUrl: './review-offers.component.html',
  styleUrls: ['./review-offers.component.css']
})
export class ReviewOffersComponent implements OnInit {
  requests = this.requestService.getSelfRequest();
  dialogRef: MatDialogRef<any>;
  displayedColumns: string[] = ['id', 'description', 'date', 'studentLevel', 'expectedStudents', 'status', 'requestDate', 'offers'];

  constructor(public requestService: RequestService, public reviewOfferModel: MatDialog, public offerService: OfferService, public schoolService: SchoolService, public router: Router) { }

  ngOnInit(): void {
    if(this.schoolService.getSadminSchool() == undefined){
      this.router.navigate(['/register-school'], {queryParams: {noSchool: true}});
    }
    this.requests = this.requests.map(r => {
      // add number of offers to each request
      r['offers'] = this.offerService.getOfferByRequestId(r.id).length;
      // set time formatting
      r.time = `${parseInt(r.time.split(':')[0]) > 12 ? parseInt(r.time.split(':')[0]) - 12 : parseInt(r.time.split(':')[0])}:${r.time.split(':')[1]} ${parseInt(r.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}`;
      return r;
    });

    //sort the data
    this.requests.sort((a, b) => {
      //sort by date
      if(a.date < b.date) return 1;
      if(a.date > b.date) return -1;
      //sort by status
      if(a.status === 'NEW' && b.status === 'CLOSED') return -1;
      if(a.status === 'CLOSED' && b.status === 'NEW') return 1;
      return 0;
    });
  }

  clickedRow(data: any | object){
    this.dialogRef =  this.reviewOfferModel.open(ReviewOffersModelComponent, {
      data: data,
      width: '60%',
      height: 'auto',
      position: {top: '5%'}
    })

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
  });
  }
}
