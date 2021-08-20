import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  carouselOptions = {
    items:6,
    autoplay: true,
    loop: true,
    margin: 30,
    navSpeed: 1500,
    dots: false,
    responsive:{
        0:{
            items:2,
        },
        576:{
            items:4,
        },
        768:{
            items:4,
        },
        992:{
            items:6,
        },
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
