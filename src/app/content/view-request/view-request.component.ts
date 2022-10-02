import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { ViewRequestModelComponent } from './view-request-model/view-request-model.component';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  requests : any;
  dataSource : any;
  displayedColumns: string[] = ['status', 'requestDate', 'description', 'school', 'city'];
  schoolList: any;
  cityList: any;

  // filter
  globalFilter = {
    school: '',
    city: ''
  };

  constructor(private requestService: RequestService, private viewRequestModel: MatDialog) { }

  ngOnInit(): void {
    this.requests = this.requestService.getAllNewRequest();
    this.requests = this.requests.map(r => {
      const school = this.requestService.getSchoolByRequestID(r.id)
      r['school'] = school.name;
      r['city'] = school.city;
      return r;
    })
    this.dataSource = new MatTableDataSource(this.requests);
    this.schoolList = [...new Set(this.requests.map(r => r.school))];
    this.cityList = [...new Set(this.requests.map(r => r.city))];

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  clickedRow(data: any | object){
    this.viewRequestModel.open(ViewRequestModelComponent, {
      data: data,
      width: '30%',
      height: 'auto',
      position: {top: '5%'}
    })
  }

  applySchoolFilter(event: any){
    const filterValue = event.value;
    this.globalFilter.school = filterValue === undefined ? '' : filterValue.toLowerCase().trim();
    this.dataSource.filter = this.globalFilter;
  }
  applyCityFilter(event: any){
    const filterValue = event.value;
    this.globalFilter.city = filterValue === undefined ? '' : filterValue.toLowerCase().trim();
    this.dataSource.filter = this.globalFilter;
  }

  customFilterPredicate(){
    return (data: any, filter: object | any) => {
      return data.school.toLowerCase().trim().indexOf(filter.school) !== -1 &&
       data.city.toLowerCase().trim().indexOf(filter.city) !== -1;
    }
  }

}
