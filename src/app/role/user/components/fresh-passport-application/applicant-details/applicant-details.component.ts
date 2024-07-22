import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.css'
})
export class ApplicantDetailsComponent {

  applicantDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.applicantDetailsForm = this.fb.group({
      givenName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      knownByOtherNames: ['no', Validators.required],
      aliases:[{ value: '', disabled: true }],
      changedName: ['no', Validators.required],
      previousName:  [{ value: '', disabled: true }],
      dob: ['', Validators.required],
      placeOfBirth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      state: ['', Validators.required],
      district: ['', Validators.required],
      regionCountry: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      citizenship: ['', Validators.required],
      pan: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      voterId: [''],
      employmentType: ['', Validators.required],
      organizationName: [''],
      parentSpouseGovernmentServant: ['', Validators.required],
      education: ['', Validators.required],
      nonEcr: ['', Validators.required],
      distinguishingMark: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      aadhaar: ['', [Validators.required,Validators.pattern(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/), Validators.minLength(12), Validators.maxLength(12)]]
    });

    this.onChanges();
  }

  ngOnInit(): void {

    this.onChanges();
  }

  onChanges(): void {
    this.applicantDetailsForm.get('knownByOtherNames')!.valueChanges.subscribe(val => {
      if (val === 'no') {
        this.applicantDetailsForm.get('aliases')!.disable();
      } else {
        this.applicantDetailsForm.get('aliases')!.enable();
      }
    });

    this.applicantDetailsForm.get('changedName')!.valueChanges.subscribe(val => {
      if (val === 'no') {
        this.applicantDetailsForm.get('previousName')!.disable();
      } else {
        this.applicantDetailsForm.get('previousName')!.enable();
      }
    });

    // Initially disable the aliases and previousName inputs if the defaults are 'no'
    if (this.applicantDetailsForm.get('knownByOtherNames')!.value === 'no') {
      this.applicantDetailsForm.get('aliases')!.disable();
    }

    if (this.applicantDetailsForm.get('changedName')!.value === 'no') {
      this.applicantDetailsForm.get('previousName')!.disable();
    }
  }
  onSaveDraft() {
    // Logic to save the draft
    console.log('Draft saved', this.applicantDetailsForm.value);
  }

  onNext() {
    if (this.applicantDetailsForm.valid) {
      // Logic to navigate to the next tab
      console.log('Form valid, navigate to next tab');
    } else {
      console.log('Form invalid');
      this.applicantDetailsForm.markAllAsTouched();
    }
  }
}
