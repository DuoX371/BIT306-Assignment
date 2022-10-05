import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { OfferService } from 'src/app/services/offer.service';
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
    city: '',
    startDate: '',
    endDate: '',
    offered: ''
  };

  // filter variables
  schoolFilter : string;
  cityFilter : string;
  startFilter : string;
  endFilter : string;
  offeredFilter: string;

  constructor(private requestService: RequestService, private viewRequestModel: MatDialog, public authService: AuthService, public offerSerivce: OfferService) { }

  ngOnInit(): void {
    this.requests = this.requestService.getAllNewRequest();
    this.requests = this.requests.map(r => {
      const school = this.requestService.getSchoolByRequestID(r.id)
      r['school'] = school.name;
      r['city'] = school.city;
      if(this.authService.getCurrentUser().type === 'volunteer'){
        r['offerStatus'] = this.offerSerivce.getUserOffer(r.id) === undefined ? 'no' : 'yes';
      }
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

  applyStartFilter(event: any){
    const filterValue = event.value.toISOString().split('T')[0];
    this.globalFilter.startDate = filterValue === undefined ? '' : filterValue.toLowerCase().trim();
    this.dataSource.filter = this.globalFilter;
  }

  applyEndFilter(event: any){
    const filterValue = event.value.toISOString().split('T')[0];
    this.globalFilter.endDate = filterValue === undefined ? '' : filterValue.toLowerCase().trim();
    this.dataSource.filter = this.globalFilter;
  }

  applyOfferFilter(event: any){
    const filterValue = event.value;
    this.globalFilter.offered = filterValue === undefined ? '' : filterValue.toLowerCase().trim();
    this.dataSource.filter = this.globalFilter;
  }

  customFilterPredicate(){
    return (data: any, filter: object | any) => {
      console.log(filter);

      return data.school.toLowerCase().trim().indexOf(filter.school) !== -1 &&
       data.city.toLowerCase().trim().indexOf(filter.city) !== -1 &&
       data.offerStatus.toLowerCase().trim().indexOf(filter.offered) !== -1 &&
       this.filterDate(filter.startDate, filter.endDate, data);
    }
  }

  // Filter date
  filterDate(startDate: string, endDate: string, data: any){
    if(startDate === '' && endDate === '') return true;
    if(startDate === '' && endDate !== '') return new Date(data.requestDate) <= new Date(endDate);
    if(startDate !== '' && endDate === '') return new Date(data.requestDate) >= new Date(startDate);
    if(startDate !== '' && endDate !== '') return new Date(data.requestDate) >= new Date(startDate) && new Date(data.requestDate) <= new Date(endDate);
    return true;
  }

  resetFilters(){
    this.globalFilter = {school: '',city: '',startDate: '',endDate: '', offered: ''};
    this.dataSource.filter = this.globalFilter;
    this.schoolFilter = '';
    this.cityFilter = '';
    this.startFilter = '';
    this.endFilter = '';
    this.offeredFilter = '';
  }

}
