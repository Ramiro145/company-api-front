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

  doAction(value:{action:string, department:Department}){

      if(value.action === 'delete'){
        this.onDelete(value.department.id)
        return;
      }

      if(value.action === 'edit'){
        this.onEdit(value.department);
        return
      }

      this.onPreview(value.department.id)
  }

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


  onDelete (id:number) {

    Swal.fire({
      title:"Are you sure?",
      text:'You wont be able to revert this!',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if(result.isConfirmed){

        this.departmentService.deleteDepartment(id).subscribe(resp => {
          if(resp === false){
              Swal.fire({
              title:'Error!',
              text:'Something went wrong',
              icon:'error'
            })
          }

          Swal.fire({
          title:'Deleted!',
          text:'department has been deleted',
          icon:'success'
          })

          this.departmentResource.reload();

        })
      }
    })


  }

  onEdit(department:Department){

  }

  onPreview (id:number){

  }

}
