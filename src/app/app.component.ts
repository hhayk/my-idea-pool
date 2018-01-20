import { Component, ViewEncapsulation, Inject, ViewContainerRef } from '@angular/core';
import { PopupService } from './services/popup.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  loading = true;

  constructor(
    @Inject(PopupService) popupService: PopupService, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef,
    private router: Router, private authService: AuthService
  ) {
    popupService.setRootViewContainerRef(viewContainerRef);

    this.authService.me((user: User) => {
      this.loading = false;

      this.router.navigate(['/my-ideas']);
    }, (err: any) => {
      this.loading = false;

      this.router.navigate(['/']);
    });
  }
}
