import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  inRequest = false;
  signupErrorReason = '';

  formErrors = {
    name: '',
    email: '',
    password: ''
  };

  validationMessages = {
    name: {
      required: this.validationService.getValidatorErrorMessage('required', { requiredString: 'Name' }),
      emptyControl: this.validationService.getValidatorErrorMessage('emptyControl'),
    },
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
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, this.validationService.emptyValidator])),
      email: new FormControl(null, Validators.compose([Validators.required, this.validationService.emailValidator])),
      password: new FormControl(null, Validators.compose([Validators.required, this.validationService.passwordValidator]))
    });

    this.signupForm.valueChanges.subscribe(data => this.validationService.onValueChanged(data, this.signupForm, this.formErrors, this.validationMessages));
    this.validationService.onValueChanged(null, this.signupForm, this.formErrors, this.validationMessages);
  }

  onSubmit(data) {
    this.inRequest = true;

    const { name, email, password } = data;
    this.authService.signup(name, email, password, (user: User) => {
      this.inRequest = false;

      this.router.navigate(['/my-ideas']);
    }, (err: any) => {
      this.inRequest = false;

      this.signupErrorReason = err.error.reason;
      setTimeout(() => this.signupErrorReason = '', 2000);
    });
  }
}
