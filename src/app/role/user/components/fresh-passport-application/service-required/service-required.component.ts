import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-required',
  templateUrl: './service-required.component.html',
  styleUrl: './service-required.component.css'
})
export class ServiceRequiredComponent {
  serviceRequiredForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serviceRequiredForm = this.fb.group({
      applicationType: ['', Validators.required],
      passportBookletType: ['', Validators.required],
      validityRequired: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSaveDraft() {
    // Logic to save the draft
    console.log('Draft saved', this.serviceRequiredForm.value);
  }

  onNext() {
    if (this.serviceRequiredForm.valid) {
      // Logic to navigate to the next tab
      console.log('Form valid, navigate to next tab');
    } else {
      console.log('Form invalid');
      this.serviceRequiredForm.markAllAsTouched();
    }
  }
}
