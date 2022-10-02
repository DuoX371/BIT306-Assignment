import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { ViewRequestModelComponent } from './view-request-model/view-request-model.component';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  showFilter = true;
  requests : any;
  displayedColumns: string[] = ['status', 'requestDate', 'description', 'school', 'city'];

  constructor(private requestService: RequestService, private viewRequestModel: MatDialog) { }

  ngOnInit(): void {
    this.requests = this.requestService.getAllNewRequest();
    this.requests = this.requests.map(r => {
      const school = this.requestService.getSchoolByRequestID(r.id)
      r['school'] = school.name;
      r['city'] = school.city;
      return r;
    })
  }

  clickedRow(data: any | object){
    this.viewRequestModel.open(ViewRequestModelComponent, {
      data: data,
      width: '30%',
      height: 'auto',
      position: {top: '5%'}
    })
  }

}
