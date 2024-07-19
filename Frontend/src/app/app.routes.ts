import { Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import {MyPersonalAreaComponent} from "./my-personal-area/my-personal-area.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
 { path: 'me', component: MyPersonalAreaComponent},
  {path: 'register', component: RegisterComponent},

];
