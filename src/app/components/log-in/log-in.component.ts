import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;

  inRequest = false;
  loginErrorReason = '';

  formErrors = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: this.validationService.getValidatorErrorMessage('required', { requiredString: 'Email' }),
      invalidEmailAddress: this.validationService.getValidatorErrorMessage('invalidEmailAddress'),
    },
    password: {
      required: this.validationService.getValidatorErrorMessage('required', { requiredString: 'Password' }),
      invalidPassword: this.validationService.getValidatorErrorMessage('invalidPassword'),
    }
  };

  constructor(private router: Router, private authService: AuthService, private validationService: ValidationService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('aaa@gmail.com', Validators.compose([Validators.required, this.validationService.emailValidator])),
      password: new FormControl('1Aaaaaaa', Validators.compose([Validators.required, this.validationService.passwordValidator]))
    });

    this.loginForm.valueChanges.subscribe(data => this.validationService.onValueChanged(data, this.loginForm, this.formErrors, this.validationMessages));
    this.validationService.onValueChanged(null, this.loginForm, this.formErrors, this.validationMessages);
  }

  onSubmit(data) {
    this.inRequest = true;

    const { email, password } = data;
    this.authService.login(email, password, (user: User) => {
      this.inRequest = false;

      this.router.navigate(['/my-ideas']);
    }, (err: any) => {
      this.inRequest = false;

      this.loginErrorReason = err.error.reason;
      setTimeout(() => this.loginErrorReason = '', 2000);
    });
  }
}
