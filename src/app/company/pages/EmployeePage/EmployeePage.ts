import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employee-page',
  imports: [],
  templateUrl: './EmployeePage.html',
  styleUrl: './EmployeePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePage { }
