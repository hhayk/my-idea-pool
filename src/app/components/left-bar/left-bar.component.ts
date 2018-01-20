import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IdeaService } from '../../services/idea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private ideaService: IdeaService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout(() => {
      this.authService.clear();
      this.ideaService.clear();

      this.router.navigate(['/']);
    }, (err: any) => {
    });
  }
}
