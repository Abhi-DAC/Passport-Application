import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z-' ]{1,50}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z-' ]{1,50}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(?:\+91[-\s]?)?[7-9]\d{9}$/)]],
      officeRegion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator } as AbstractControlOptions);
  }



  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;

    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
    }
    if (control?.hasError('pattern')) {
      return `Please enter a valid ${controlName}.`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (control?.hasError('minlength')) {
      return `Password must be at least 6 characters long.`;
    }
    if (this.registerForm.hasError('mismatch') && controlName === 'confirmPassword') {
      return 'Passwords do not match.';
    }
    return '';
  }

  onSubmit(): void {


    console.log("onsubmit")
    if (this.registerForm.valid) {
      console.log("in calid");

      this.registerForm.reset();
      this.router.navigate(['login']);
      this.toastr.success('Registration successful!', 'Success');
    } else {

      this.toastr.error('Please fill in the form correctly', 'Form Error');
      
        
      };
  
    }
  }
