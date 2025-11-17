import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Modal} from 'bootstrap';
import { DepartmentPost } from '../../../../interfaces/departments.interface';

@Component({
  selector: 'add-department',
  imports: [ReactiveFormsModule],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDepartment {

  openModal(){
    const modalElement = document.getElementById('exampleModal');
    const modal = Modal.getInstance(modalElement!) || new Modal(modalElement!);
    modal.show();
  }


  closeModal(){
    this.departmentForm.reset();
    const modalElement = document.getElementById('exampleModal');

    const modal = Modal.getInstance(modalElement!) || new Modal(modalElement!);

    modal.hide();
  }

  fb = inject(FormBuilder);

  department = output<DepartmentPost>();

  departmentForm:FormGroup = this.fb.group({
    name:['',Validators.required],
    location:['',Validators.required]
  })


  onSubmit(){

    if(this.departmentForm.invalid){
      return
    }

    this.department.emit(this.departmentForm.value)

    this.closeModal();

  }




}
