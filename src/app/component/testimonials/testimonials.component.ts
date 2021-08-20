import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  
  carouselOptions = {
    items:1,
    autoplay: true,
    loop: true,
    margin: 30,
    slideSpeed: 800,
    dots: false,
    smartSpeed: 800,
    responsive:{
        992:{
            dots: true,
        },
    }
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
