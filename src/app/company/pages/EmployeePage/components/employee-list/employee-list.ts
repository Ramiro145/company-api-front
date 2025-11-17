import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeList { }
