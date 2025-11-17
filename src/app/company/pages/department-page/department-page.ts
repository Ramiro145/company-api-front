import { ChangeDetectionStrategy, Component, inject, ViewChild, viewChild } from '@angular/core';
import { DepartmentList } from "./components/department-list/department-list";
import { DepartmentService } from '../../services/department.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Department, DepartmentDTO } from '../../interfaces/departments.interface';
import { tap } from 'rxjs';
import { AddDepartment } from "./components/add-department/add-department";
import { SwalComponent, SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { PreviewDepartment } from "./components/preview-department/preview-department";

@Component({
  selector: 'app-department-page',
  imports: [DepartmentList, AddDepartment, PreviewDepartment],
  templateUrl: './department-page.html',
  styleUrl: './department-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPage {

  @ViewChild('modalComp') modalComp!: AddDepartment;
  @ViewChild('previewModal') previewModal!: PreviewDepartment;


  departmentService = inject(DepartmentService);

  selectedDepartment: Department | null= null;
  previewDepartment: Department | null = null;

  doAction(value:{action:string, department:Department}){

    console.log(value);
      if(value.action === 'delete'){
        this.onDelete(value.department.id)
        return;
      }

      if(value.action === 'edit'){
        this.onModalEdit(value.department);
        return
      }



      this.onPreview(value.department)
  }

  departmentResource = rxResource<Department[],undefined|null>({
    stream: () => {
      return this.departmentService.getAllDepartments()
    }
  })

  addEditDepartment (actions:{action:string, department:DepartmentDTO}) {
    if(actions.action == 'add'){
      this.departmentPost(actions.department)
      return;
    }else{
      this.departmentEdit(actions.department);
    }
  }

  departmentPost(department:DepartmentDTO){

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

  departmentEdit(department:DepartmentDTO){

    this.departmentService.editDepartment(department).subscribe({
      next: (resp) => {
        Swal.fire({
        title:'Great',
        text:'Department Updated!',
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

  onModalEdit(department:Department){
    this.selectedDepartment = department;
    this.modalComp.openModal();
  }


  onPreview (department:Department){
    this.previewDepartment = department;
    this.previewModal.openModal();
  }

}
