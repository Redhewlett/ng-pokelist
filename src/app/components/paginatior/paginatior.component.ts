import { Component } from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
@Component({
  selector: 'app-paginatior',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginatior.component.html',
  styleUrl: './paginatior.component.scss'
})
export class PaginatiorComponent {

}
