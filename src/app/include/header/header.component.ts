import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../../main/main.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = this.authService.getCurrentUser();

  constructor(public mainService: MainService, public authService: AuthService, public router: Router) { }

  toggleSidenav() {
    this.mainService.toggleSidenav();
  }

  login(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  async updatePfp(){
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      },
      heightAuto: false
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result as string,
          imageAlt: 'The uploaded picture',
          heightAuto: false
        })
        this.currentUser.pfp = e.target.result as string;
        //update pfp in db
        // this.authService.updatePfp(this.currentUser.pfp);
      }
      reader.readAsDataURL(file)
    }
  }

  ngOnInit(): void {
    //get current url
    if(this.router.url === '/'){
      switch (this.currentUser?.type) {
        case 'admin' : this.router.navigate(['register-school-admin']); break;
        case 'sadmin' : this.router.navigate(['register-school']); break;
        default: break;
      }
    }
    this.currentUser.pfp = this.currentUser.pfp || 'https://i.imgur.com/qCX4UDv.png';
  }

}
