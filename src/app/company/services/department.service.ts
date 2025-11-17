import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentDTO } from '../interfaces/departments.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class DepartmentService {

  private baseUrl = environment.baseUrl;

  http = inject(HttpClient);


  getAllDepartments():Observable<Department[]>{

    return this.http.get<Department[]>(`${this.baseUrl}/api/Departments`)

  }

  getDepartmentById (id:number) {

  }


  addDepartment (department:DepartmentDTO):Observable<boolean> {

    return this.http.post<boolean>(`${this.baseUrl}/api/Departments`,department);

  }


  deleteDepartment (id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/api/Departments/${id}`);
  }


  editDepartment (department:DepartmentDTO):Observable<boolean>{
    return this.http.patch<boolean>(`${this.baseUrl}/api/Departments/${department.id}`,{name:department.name, location:department.location});
  }



}
