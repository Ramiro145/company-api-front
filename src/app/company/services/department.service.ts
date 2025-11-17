import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/departments.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class DepartmentService {

  private baseUrl = environment.baseUrl;

  http = inject(HttpClient);


  getAllDepartments():Observable<Department[]>{

    return this.http.get<Department[]>(`${this.baseUrl}/api/Departments`)

  }




}
