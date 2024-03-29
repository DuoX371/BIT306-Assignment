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
  isLoading = true;
  requests: object | any; //= this.requestService.getSelfRequest();
  dialogRef: MatDialogRef<any>;
  displayedColumns: string[] = ['id', 'description', 'date', 'studentLevel', 'expectedStudents', 'status', 'requestDate', 'offers'];

  constructor(public requestService: RequestService, public reviewOfferModel: MatDialog, public offerService: OfferService, public schoolService: SchoolService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    if(await this.schoolService.getSadminSchool() == null){
      this.router.navigate(['/register-school'], {queryParams: {noSchool: true}});
    }
    await this.loadTableData();
    this.isLoading = false;
  }

  clickedRow(data: any | object){
    this.dialogRef =  this.reviewOfferModel.open(ReviewOffersModelComponent, {
      data: data,
      width: '60%',
      height: 'auto',
      position: {top: '5%'}
    })

    this.dialogRef.afterClosed().subscribe(async result => {
      this.dialogRef = null;
      await this.loadTableData();
    });
  }

  async loadTableData(){
    this.requests = await this.requestService.getSelfRequest();

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
}
