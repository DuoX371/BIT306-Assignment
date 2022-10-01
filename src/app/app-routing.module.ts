import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './content/test/test.component';
import { RegisterSchoolAdminComponent } from './content/register-school-admin/register-school-admin.component';
import { RegisterSchoolComponent } from './content/register-school/register-school.component';
import { SubmitRequestComponent } from './content/submit-request/submit-request.component';

// Auth Guard

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'register-school-admin', component: RegisterSchoolAdminComponent},
    {path: 'register-school', component: RegisterSchoolComponent},
    {path: 'submit-request', component: SubmitRequestComponent},
    {path: 'test', component: TestComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }




