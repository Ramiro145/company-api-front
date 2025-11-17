import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopMenu } from "../../components/top-menu/top-menu";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company-layout',
  imports: [TopMenu, RouterOutlet],
  templateUrl: './CompanyLayout.html',
  styleUrl: './CompanyLayout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyLayout { }
