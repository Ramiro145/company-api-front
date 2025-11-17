import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Department } from '../../../../interfaces/departments.interface';

@Component({
  selector: 'department-list',
  imports: [],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentList {

  departments = input.required<Department[]>();
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);


}
