import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  //nav bar state
  private _sidenavOpen: boolean;
  private _sidenavOpenUpdate = new Subject<boolean>();

  toggleSidenav() {
    this._sidenavOpen = !this._sidenavOpen;
    localStorage.setItem('sidenavOpen', JSON.stringify(this._sidenavOpen));
    this._sidenavOpenUpdate.next(this._sidenavOpen);
  }

  getSidenavOpen() {
    this._sidenavOpen = JSON.parse(localStorage.getItem('sidenavOpen'));
    return this._sidenavOpen;
  }

  getSidenavOpenUpdate() {
    return this._sidenavOpenUpdate.asObservable();
  }

  constructor() { }
}
