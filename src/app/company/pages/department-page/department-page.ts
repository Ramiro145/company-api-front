import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DepartmentList } from "./components/department-list/department-list";
import { DepartmentService } from '../../services/department.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Department, DepartmentPost } from '../../interfaces/departments.interface';
import { tap } from 'rxjs';
import { AddDepartment } from "./components/add-department/add-department";
import { SwalComponent, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-page',
  imports: [DepartmentList, AddDepartment],
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

  departmentPost(department:DepartmentPost){



    this.departmentService.addDepartment(department).subscribe({
      next: (resp) => {

        Swal.fire({
        title:'Great',
        text:'Department added',
        icon:'success'
      })

      this.departmentResource.reload();

      },
      error(err) {
          Swal.fire({
          title:'Failed!',
          text:'something went wrong',
          icon:'success'
        })

        console.log(err);
      },
    })

  }


}
