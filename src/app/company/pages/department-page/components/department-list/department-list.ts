import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Department } from '../../../../interfaces/departments.interface';
import { MatIconModule, MatIcon } from '@angular/material/icon';

@Component({
  selector: 'department-list',
  imports: [MatIcon],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentList {


  action = output<{action:string, department:Department}>();

  departments = input.required<Department[]>();
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  onAction(action:string, department:Department){
    this.action.emit({action, department});
  }
}
