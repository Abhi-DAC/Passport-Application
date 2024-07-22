import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fresh-application',
  templateUrl: './fresh-application.component.html',
  styleUrl: './fresh-application.component.css'
})
export class FreshApplicationComponent {
  passportForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.passportForm = this.fb.group({
      application_type: ['', Validators.required],
      passport_booklet_type: ['36_pages', Validators.required],
      validity_required: ['10_years', Validators.required],
      // Add form controls for other fields
    });
  }

  onSubmit(): void {
    if (this.passportForm.valid) {
      console.log('Form Submitted', this.passportForm.value);
      // Handle form submission logic here
    }
  }

  saveDraft(): void {
    console.log('Form Draft Saved', this.passportForm.value);
    // Handle save draft logic here
  }

  goToTab(tabId: string): void {
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.click();
    }
  }
}
