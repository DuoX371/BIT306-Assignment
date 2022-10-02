import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SchoolService } from 'src/app/services/school.service';
import { RequestService } from 'src/app/services/request.service';

export interface RequestTable {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;

  requestID: string;
  school: string;
  city: string;
  date: string;
  status: string;
  description: string;
  tutorialDate: string;
  tutorialTime: string;
  studentLevel: string;
  numStudents: string;
  resourceType: string;
  numRequired: String;
  
}

const ELEMENT_DATA: RequestTable[] = [
  {requestID: '1', school: 'Mondstadt Bartender', city: 'Mondstadt', date: '2020-01-10', status: 'NEW', description:'Venti',
  tutorialDate:'2021-01-01', tutorialTime:'0000', studentLevel: 'Anemo', numStudents:'100', resourceType: 'Beer', numRequired: '10'},
 
  {requestID: '2', school: 'Liyue WangShen Tang', city: 'Liyue', date: '2020-01-09', status: 'NEW', description:'ZhongLi',
  tutorialDate:'2021-01-01', tutorialTime:'0100', studentLevel: 'Geo', numStudents:'110', resourceType: 'Mora', numRequired: '11'},
  
  {requestID: '3', school: 'Inazuma Akihabara', city: 'Inazuma', date: '2020-01-08', status: 'NEW', description:'Raidei Ei',
  tutorialDate:'2021-01-01', tutorialTime:'0200', studentLevel: 'Electro', numStudents:'120', resourceType: 'Dessert', numRequired: '12'},
 
  {requestID: '4', school: 'Sumeru Mosque', city: 'Sumeru', date: '2020-01-07', status: 'NEW', description:'Nahida',
  tutorialDate:'2021-01-01', tutorialTime:'0300', studentLevel: 'Dendro', numStudents:'130', resourceType: 'Teriri', numRequired: '13'},
  
  {requestID: '5', school: 'Fontaine Airport', city: 'Fontaine', date: '2020-01-06', status: 'CLOSED', description:'Seele',
  tutorialDate:'2021-01-01', tutorialTime:'0400', studentLevel: 'Hydro', numStudents:'140', resourceType: 'Bronya Onesamaa', numRequired: '14'},
 
  {requestID: '6', school: 'Natlan Military', city: 'Natlan', date: '2020-01-05', status: 'CLOSED', description:'Murata Himeko',
  tutorialDate:'2021-01-01', tutorialTime:'0500', studentLevel: 'Pyro', numStudents:'150', resourceType: 'RIP', numRequired: '15'},
 
  {requestID: '7', school: 'Snezhnaya IceWorld', city: 'Snezhnaya', date: '2020-01-04', status: 'CLOSED', description:'BIG BRONYA ZAYCHIK',
  tutorialDate:'2021-01-01', tutorialTime:'0600', studentLevel: 'Cryo', numStudents:'160', resourceType: 'Motorbike', numRequired: '16'},
 
  {requestID: '8', school: "Khaen'riah WayBackHome", city: "Khaen'riah", date: '2020-01-03', status: 'CLOSED', description:'Imouto',
  tutorialDate:'2021-01-01', tutorialTime:'0700', studentLevel: 'Abbys', numStudents:'170', resourceType: 'Paimon', numRequired: '17'},
 
  {requestID: '9', school: 'Honkai Academy',  city: 'Honkai Academy', date: '2020-01-02', status: 'CLOSED', description:'Kiana',
  tutorialDate:'2021-01-01', tutorialTime:'0800', studentLevel: 'Hersscher', numStudents:'180', resourceType: 'Moon', numRequired: '18'},
 
  {requestID: '10', school: 'miHoYo World', city: 'miHoYo World', date: '2020-01-01', status: 'CLOSED', description:'Primogem',
  tutorialDate:'2021-01-01', tutorialTime:'0900', studentLevel: 'Otaku', numStudents:'190', resourceType: 'Credit card', numRequired: '19'},
];

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements AfterViewInit {
  displayedColumns: string[] = ['requestID', 'school', 'city', 'date', 'status', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // displayedColumns2: string[] = ['tutorialDate', 'tutorialTime', 'studentLevel', 'numStudents', 'resourceType', 'numRequired'];

  // showTable: boolean = false;



  clickedRows = new Set<RequestTable>();

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  log_console() {
    console.log
        (this.clickedRows);
}


}
