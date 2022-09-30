import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { LoginComponent } from './content/login/login.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './content/test/test.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
    {path: '', component: HomeComponent, data: {title: 'Home'}},
    {path: 'test', component: TestComponent, data:{title: 'Data'}},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




