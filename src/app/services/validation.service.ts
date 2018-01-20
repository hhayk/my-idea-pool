import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {
  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'emptyControl': 'Field required',
      'invalidEmailAddress': 'Invalid email address.',
      'invalidPassword': 'Password must be at at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number.',
      'required': `${validatorValue && validatorValue.requiredString} is required.`,
    };

    return config[validatorName];
  }

  emptyValidator(control) {
    return control.value && control.value.length > 0 ? null : { 'emptyControl': true };
  }

  emailValidator(control) {
    const EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return control.value && control.value.match(EMAIL_REGEXP) ? null : { 'invalidEmailAddress': true };
  }

  passwordValidator(control) {
    // {8,100}           - Assert password is between 8 and 100 characters
    // (?=.*[a-z])       - Assert a string has at least one lowercase
    // (?=.*[A-Z])       - Assert a string has at least one uppercase
    // (?=.*[0-9])       - Assert a string has at least one number
    const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/;

    return control.value && control.value.match(PASSWORD_REGEXP) ? null : { 'invalidPassword': true };
  }

  onValueChanged(data, form: AbstractControl, formErrors?: any, validationMessages?, formSuccess?) {
    if (!form) {
      return;
    }

    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        const control: AbstractControl = this.getFormControl(form, field.split('_'));
        formErrors[field] = '';

        if (control && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

    for (const field in formSuccess) {
      if (formErrors.hasOwnProperty(field)) {
        formSuccess[field] = '';
      }
    }

    if (!form.valid) {
      for (const error in form.errors) {
        if (form.errors.hasOwnProperty(error)) {
          console.log(error);
          console.log(validationMessages);
          const messages = validationMessages[error];
          formErrors[error] += messages[error] + ' ';
        }
      }
    }
  }

  private getFormControl(form: AbstractControl, path: string[]) {
    const first = path.shift();
    if (path.length > 0) {
      return this.getFormControl(form.get(first), path);
    } else {
      return form.get(first);
    }
  }
}
