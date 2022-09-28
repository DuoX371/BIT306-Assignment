import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public mainService: MainService) { }

  toggleSidenav() {
    this.mainService.toggleSidenav();
  }

  ngOnInit(): void {
  }

}
