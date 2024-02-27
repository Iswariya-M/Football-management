import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { TeamComponent } from './pages/team/team.component';
import { MatchComponent } from './pages/match/match.component';
import { BookComponent } from './pages/book/book.component';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:'team',
    component:TeamComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'match',
    component:MatchComponent
  },
  {
    path:'book',
    component:BookComponent
  },
  { 
    path: 'team/:id', 
    component: TeamDetailComponent
  },
  {
    path:'success',
    component:SuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
