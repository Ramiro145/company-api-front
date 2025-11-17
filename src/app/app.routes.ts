import { Path } from './../../node_modules/@angular-devkit/core/src/virtual-fs/path.d';
import { Routes } from '@angular/router';
import { CompanyLayout } from './company/layouts/CompanyLayout/CompanyLayout';
import { DepartmentPage } from './company/pages/department-page/department-page';
import { EmployeePage } from './company/pages/EmployeePage/EmployeePage';

export const routes: Routes = [

  {
    path:'company',
    component:CompanyLayout,
    children:[
      {
        path:'department',
        component:DepartmentPage
      },
      {
        path:'employee',
        component:EmployeePage
      },
      {
        path:'**',
        redirectTo:'department'
      }
    ]
  },

  {
    path:'**',
    redirectTo:"company"
  }
];
