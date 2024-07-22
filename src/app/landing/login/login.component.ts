import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private toastr: ToastrService
      // private storageService: BrowserStorageService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });


    
  }


  ngOnInit() {
  }


  onSubmit(): void {
    if (this.loginForm.valid) {

      const { email, password, rememberMe } = this.loginForm.value;
      if (rememberMe  ) {
       localStorage.setItem('rememberedUser', JSON.stringify({ "email":email,"password": password }));
      } else{
        localStorage.removeItem('rememberedUser');
      }

      this.toastr.success("login Successful");
      this.router.navigate(['/user']);
    } else {
      console.log('Form is invalid');
      this.toastr.error("invalid User or Password");

    }
  }


  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
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
    if (this.loginForm.hasError('mismatch') && controlName === 'confirmPassword') {
      return 'Passwords do not match.';
    }
    return '';
  }


}
