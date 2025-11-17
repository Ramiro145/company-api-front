import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Department } from '../../../../interfaces/departments.interface';

@Component({
  selector: 'preview-department',
  imports: [],
  templateUrl: './preview-department.html',
  styleUrl: './preview-department.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewDepartment{

  department = input<Department | null>();


  openModal(){
      const modalElement = document.getElementById('previewModal');
      const modal = Modal.getInstance(modalElement!) || new Modal(modalElement!);
      modal.show();
    }

    closeModal(){
      const modalElement = document.getElementById('previewModal');
      const modal = Modal.getInstance(modalElement!) || new Modal(modalElement!);
      modal.hide();
    }


}
