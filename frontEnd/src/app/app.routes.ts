import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlacasComponent } from './components/placas/placas.component';
import { PlacaTableComponent } from './components/placa-table/placa-table.component';
import { PlacaModalComponent } from './components/placa-modal/placa-modal.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'placas', component: PlacasComponent },
    {path: 'placaTable', component: PlacaTableComponent},
    {path: 'placamModal', component: PlacaModalComponent}
];
