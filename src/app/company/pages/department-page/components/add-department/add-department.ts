import { ChangeDetectionStrategy, Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Modal} from 'bootstrap';
import { DepartmentDTO } from '../../../../interfaces/departments.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-department',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDepartment implements OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    const dept = this.departmentToEdit();
    if(dept){
      this.departmentForm.patchValue(dept);
    }else{
      this.departmentForm.reset();
    }
  }


  departmentToEdit = input<DepartmentDTO | null>();
  finished = output();


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
    this.finished.emit()
  }

  fb = inject(FormBuilder);

  department = output<{action:string, department:DepartmentDTO}>();

  departmentForm:FormGroup = this.fb.group({
    name:['',Validators.required],
    location:['',Validators.required]
  })


  onSubmit(){

    if(this.departmentForm.invalid){
      return
    }

    if(this.departmentToEdit == null){
      this.department.emit({action:'add', department:this.departmentForm.value})
    }

    this.department.emit({action:'edit',
       department: {
        id: this.departmentToEdit()?.id,
        name: this.departmentForm.controls['name'].value,
        location: this.departmentForm.controls['location'].value
       }
      }
      )

    this.closeModal();

  }




}
