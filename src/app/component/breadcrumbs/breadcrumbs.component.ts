import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent  {

  @Input() home: string = 'home';
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
