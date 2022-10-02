import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterSchoolAdminComponent } from './content/register-school-admin/register-school-admin.component';
import { RegisterSchoolComponent } from './content/register-school/register-school.component';
import { SubmitRequestComponent } from './content/submit-request/submit-request.component';
import { ReviewOffersComponent } from './content/review-offers/review-offers.component';


// Auth Guard
import { AdminGuard } from './authGuard/admin.guard';
import { SchoolAdminGuard } from './authGuard/school-admin.guard';
import { VolunteerGuard } from './authGuard/volunteer.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
    {path: '', component: HomeComponent},
    // Admin Pages
    {path: 'register-school-admin', component: RegisterSchoolAdminComponent, canActivate: [AdminGuard]},
    // School Admin Pages
    {path: 'register-school', component: RegisterSchoolComponent, canActivate: [SchoolAdminGuard]},
    {path: 'submit-request', component: SubmitRequestComponent, canActivate: [SchoolAdminGuard]},
    {path: 'review-offers', component: ReviewOffersComponent, canActivate: [SchoolAdminGuard]},
  ]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }




