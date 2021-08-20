import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-free-courses',
  templateUrl: './free-courses.component.html',
  styleUrls: ['./free-courses.component.css']
})
export class FreeCoursesComponent implements OnInit {
  
  carouselOptions = {
    items: 4,
    autoPlay: true,
    loop: true,
    margin: 30,
    navSpeed: 1000,
    nav: true,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      }
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
