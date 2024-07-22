import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fresh-application',
  templateUrl: './fresh-application.component.html',
  styleUrl: './fresh-application.component.css'
})
export class FreshApplicationComponent {
  selfDeclarationForm: FormGroup;
  otherDetailsForm: FormGroup;
  emergencyContactDetailsForm: FormGroup;
  addressDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
    
    

    this.addressDetailsForm = this.fb.group({
      presentHouseStreet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      presentTown: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      presentState: ['', Validators.required],
      presentDistrict: ['', Validators.required],
      presentPoliceStation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      pin: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      telephoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      sameAddress: [false],
      permanentHouseStreet: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      permanentTown: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      permanentState: ['', Validators.required],
      permanentDistrict: ['', Validators.required],
      permanentPoliceStation: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      permanentPin: ['', Validators.required]
    });

    
    this.emergencyContactDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(70)]],
      address: ['', Validators.maxLength(100)],
      mobileNumber: ['', Validators.required],
      telephoneNumber: [''],
      email: ['', [Validators.required, Validators.email]]
    });


    
    this.otherDetailsForm = this.fb.group({
      criminalProceedings1: ['', Validators.required],
      courtName1: [''],
      caseNumber1: [''],
      lawSection1: [''],
      criminalProceedings2: ['', Validators.required],
      courtName2: [''],
      caseNumber2: [''],
      lawSection2: [''],
      criminalProceedings3: ['', Validators.required],
      courtName3: [''],
      caseNumber3: [''],
      lawSection3: [''],
      criminalProceedings4: ['', Validators.required],
      courtName4: [''],
      caseNumber4: [''],
      lawSection4: [''],
      criminalConvictions: ['', Validators.required],
      courtName5: [''],
      caseNumber5: [''],
      convictionDate: [''],
      refusedPassport1: ['', Validators.required],
      refusalReason: [''],
      refusedPassport2: ['', Validators.required],
      impoundedPassportNumber: [''],
      impoundingReason: [''],
      refusedPassport3: ['', Validators.required],
      revokedPassportNumber: [''],
      revocationReason: [''],
      grantedCitizenship1: ['', Validators.required],
      regionCountryGranted: [''],
      grantedCitizenship2: ['', Validators.required],
      regionCountryHeld: [''],
      grantedCitizenship3: ['', Validators.required],
      surrenderedPassportNumber: [''],
      grantedCitizenship4: ['', Validators.required],
      applicationDetails: [''],
      applicationPlace: [''],
      surrenderedPassport1: ['', Validators.required],
      ecNo: [''],
      ecIssueDate: [''],
      issuingAuthority: [''],
      returnDate: [''],
      returnRegion: [''],
      ecReason: [''],
      surrenderedPassport2: ['', Validators.required],
      deportedDetails: [''],
      surrenderedPassport3: ['', Validators.required],
      repatriatedDetails: ['']
    });


    this.selfDeclarationForm = this.fb.group({
      place: ['', Validators.required],
      date: ['', Validators.required],
      applicantSignature: [null, Validators.required],
      leftHandThumbImp: [null, Validators.required],
      applicantPhoto: [null, Validators.required]
    });
  }


  ngOnInit(): void {
    this.onChanges();
  }

  onChanges(): void {
    this.toggleAdditionalFields('criminalProceedings1', 'courtName1', 'caseNumber1', 'lawSection1');
    this.toggleAdditionalFields('criminalProceedings2', 'courtName2', 'caseNumber2', 'lawSection2');
    this.toggleAdditionalFields('criminalProceedings3', 'courtName3', 'caseNumber3', 'lawSection3');
    this.toggleAdditionalFields('criminalProceedings4', 'courtName4', 'caseNumber4', 'lawSection4');
    this.toggleAdditionalFields('criminalConvictions', 'courtName5', 'caseNumber5', 'convictionDate');
    this.toggleAdditionalFields('refusedPassport1', 'refusalReason');
    this.toggleAdditionalFields('refusedPassport2', 'impoundedPassportNumber', 'impoundingReason');
    this.toggleAdditionalFields('refusedPassport3', 'revokedPassportNumber', 'revocationReason');
    this.toggleAdditionalFields('grantedCitizenship1', 'regionCountryGranted');
    this.toggleAdditionalFields('grantedCitizenship2', 'regionCountryHeld');
    this.toggleAdditionalFields('grantedCitizenship3', 'surrenderedPassportNumber');
    this.toggleAdditionalFields('grantedCitizenship4', 'applicationDetails', 'applicationPlace');
    this.toggleAdditionalFields('surrenderedPassport1', 'ecNo', 'ecIssueDate', 'issuingAuthority', 'returnDate', 'returnRegion', 'ecReason');
    this.toggleAdditionalFields('surrenderedPassport2', 'deportedDetails');
    this.toggleAdditionalFields('surrenderedPassport3', 'repatriatedDetails');


    this.addressDetailsForm.get('sameAddress').valueChanges.subscribe(value => {
      if (value) {
        this.addressDetailsForm.patchValue({
          permanentHouseStreet: this.addressDetailsForm.get('presentHouseStreet').value,
          permanentTown: this.addressDetailsForm.get('presentTown').value,
          permanentState: this.addressDetailsForm.get('presentState').value,
          permanentDistrict: this.addressDetailsForm.get('presentDistrict').value,
          permanentPoliceStation: this.addressDetailsForm.get('presentPoliceStation').value,
          permanentPin: this.addressDetailsForm.get('pin').value
        });
      } else {
        this.addressDetailsForm.patchValue({
          permanentHouseStreet: '',
          permanentTown: '',
          permanentState: '',
          permanentDistrict: '',
          permanentPoliceStation: '',
          permanentPin: ''
        });
      }
    });
  }


  toggleAdditionalFields(controlName: string, ...fieldNames: string[]): void {
    this.otherDetailsForm.get(controlName).valueChanges.subscribe(value => {
      if (value === 'yes') {
        fieldNames.forEach(fieldName => {
          this.otherDetailsForm.get(fieldName).setValidators([Validators.required]);
          this.otherDetailsForm.get(fieldName).updateValueAndValidity();
        });
      } else {
        fieldNames.forEach(fieldName => {
          this.otherDetailsForm.get(fieldName).clearValidators();
          this.otherDetailsForm.get(fieldName).updateValueAndValidity();
        });
      }
    });
  }

  onFileChange(event, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.selfDeclarationForm.patchValue({
        [controlName]: file
      });
    }
  }

  onSaveDraft() {
    // Logic to save the draft
    console.log('Draft saved', this.selfDeclarationForm.value);
  }

  onNext() {
    if (this.selfDeclarationForm.valid) {
      // Logic to navigate to the next tab
      console.log('Form valid, navigate to next tab');
    } else {
      console.log('Form invalid');
      this.selfDeclarationForm.markAllAsTouched();
    }
  }









}
