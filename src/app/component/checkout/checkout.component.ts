import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CoursePayload } from '../../model/course-payload';
import { Enrollment } from '@app/model/enrollment-payload';
import { CheckoutService } from '@app/service/checkout.service';
import { User } from '@app/model/user';
import { AuthenticationService } from '@app/service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private items: CoursePayload[] = [];
  user!: User;

  constructor(private cartService: CartService,
              private checkoutService: CheckoutService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  get Items() {
    return this.items;
  }

  // Remove item from cart list
  removeItem(productId) {
    this.cartService.removeItem(productId);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }

  get userId() {
    return this.authenticationService.userId;
  }

  submit() {
    let enrollments: Array<Enrollment> = [];

    this.Items.forEach(element => {
      const item: Enrollment = {
        id: '',
        student_id: this.userId,
        course_id: element.id,
        price: ''
      };
      enrollments.push(item);
    });

    this.checkoutService.enroll(enrollments).subscribe((data: any) => {

    }, (err: any) => {
      console.log('Failure Response');
    });
  }

}
