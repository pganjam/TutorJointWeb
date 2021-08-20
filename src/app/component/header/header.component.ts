import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursePayload } from '@app/model';
import { User } from 'src/app/model/user';
import { CartService } from '@app/service/cart.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user!: User;
  public itemCount: string = '0';

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public cartService: CartService
    ) {
      this.cartService.count.subscribe(result => {
        this.itemCount = result; //this set's the count to the default observable value
      });
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get userId() {
    return this.authenticationService.userId;
  }

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  get isTutor() {
    return this.authenticationService.isTutor;
  }

  get isStudent() {
    return this.authenticationService.isStudent;
  }

  logout() {
    this.itemCount = '0';
    this.cartService.emptyCart();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}