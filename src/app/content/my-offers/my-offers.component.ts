import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  myOffers: any;
  dataSource: any;
  globalFilter : any = {status : ''}
  displayedColumns: string[] = ['id', 'description', 'date', 'time', 'status'];
  constructor(private offerService: OfferService) { }

  async ngOnInit(): Promise<void> {
    this.myOffers = await this.offerService.getMyOffers();
    this.dataSource = new MatTableDataSource(this.myOffers);;
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  applyTypeFilter(event: Event | any) {
    const filterValue = event.value;
    this.globalFilter.status = filterValue === undefined ? '' : filterValue.trim().toLowerCase();
    this.dataSource.filter = this.globalFilter;
  }

  //custom filter, type must match case
  customFilterPredicate(){
    return (data: any, filter: object | any) => {
      return data.status.toLowerCase().trim() === filter.status || filter.status === '';
    }
  }

}
