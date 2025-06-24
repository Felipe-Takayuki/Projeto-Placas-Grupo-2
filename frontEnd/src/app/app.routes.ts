import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlacasComponent } from './components/placas/placas.component';

export const routes: Routes = [
    { path: '', component: RegisterComponent },  
    { path: 'login', component: LoginComponent },
    { path: 'placas', component: PlacasComponent }
];
