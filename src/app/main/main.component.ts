import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private sideNavSub: Subscription = new Subscription();
  constructor(public mainService: MainService, ) { }

  sideNavStatus = this.mainService.getSidenavOpen();

  ngOnInit(): void {
    this.sideNavSub = this.mainService.getSidenavOpenUpdate().subscribe((status) => {
      this.sideNavStatus = status;
    })
  }

  //mobile change to over
}
