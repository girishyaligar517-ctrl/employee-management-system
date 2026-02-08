import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list';
import { EmployeeAddComponent } from './employees/employee-add/employee-add';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
   { path: 'add', component: EmployeeAddComponent },
   { path: 'edit/:id', component: EmployeeEditComponent }
];
