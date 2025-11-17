import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DepartmentList } from "./components/department-list/department-list";
import { DepartmentService } from '../../services/department.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Department } from '../../interfaces/departments.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-department-page',
  imports: [DepartmentList],
  templateUrl: './department-page.html',
  styleUrl: './department-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPage {

  departmentService = inject(DepartmentService);

  departmentResource = rxResource<Department[],undefined|null>({
    stream: () => {
      return this.departmentService.getAllDepartments()
    }
  })



}
