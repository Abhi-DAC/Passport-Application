import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Application {
  id: number;
  type: string;
  date: string;
  status: string;
  form: {
    formId: string;
    formType: string;
    pages: number;
  };
  userID: string;
  feePaid: boolean;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  applications: Application[] = [
    {
      id: 12345,
      type: 'Fresh Application',
      date: '2024-06-01',
      status: 'Approved',
      form: {
        formId: 'F12345',
        formType: 'tatkal',
        pages: 36
      },
      userID: 'U12345',
      feePaid: true
    },
    {
      id: 12346,
      type: 'Renewal',
      date: '2024-05-15',
      status: 'Pending',
      form: {
        formId: 'F12346',
        formType: 'normal',
        pages: 60
      },
      userID: 'U12346',
      feePaid: false
    },
    {
      id: 12347,
      type: 'Fresh Application',
      date: '2024-07-10',
      status: 'Completed',
      form: {
        formId: 'F12347',
        formType: 'tatkal',
        pages: 36
      },
      userID: 'U12347',
      feePaid: true
    }
  ];
  selectedApplication: Application | null = null;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      applicationId: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      ccNumber: ['', [Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)]],
      ccExpiry: ['', [Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]],
      ccCvc: ['', [Validators.pattern(/^[0-9]{3,4}$/)]],
      paypalEmail: ['', [Validators.email]],
      upiId: ['', [Validators.pattern(/^\d{10}@[a-zA-Z]{3}$/)]]
    });

    this.paymentForm.get('paymentMethod')!.valueChanges.subscribe(value => {
      this.handlePaymentMethodChange(value);
    });
  }

  ngOnInit(): void {
    this.populateApplicationSelect();
  }

  populateApplicationSelect(): void {
    const selectElement = document.getElementById('applicationSelect') as HTMLSelectElement;
    this.applications.forEach(application => {
      if (!application.feePaid) {
        const option = document.createElement('option');
        option.value = application.id.toString();
        option.text = `Application ID: ${application.id}`;
        selectElement.appendChild(option);
      }
    });
  }

  onApplicationSelectChange(event: any): void {
    const applicationId = parseInt(event.target.value, 10);
    if (!isNaN(applicationId)) {
      this.updateAmountDetails(applicationId);
    }
  }

  updateAmountDetails(applicationId: number): void {
    this.selectedApplication = this.applications.find(app => app.id === applicationId) || null;
    if (this.selectedApplication) {
      const appTypeElement = document.getElementById('appType');
      const pagesElement = document.getElementById('pages');
      const appFeeElement = document.getElementById('appFee');
      const totalFeeElement = document.getElementById('totalFee');
      const applicationFee = this.calculateFee(this.selectedApplication.form.formType, this.selectedApplication.form.pages);
      const platformFee = 10;
      const totalFee = applicationFee + platformFee;
      if (appTypeElement) appTypeElement.textContent = this.selectedApplication.form.formType;
      if (pagesElement) pagesElement.textContent = this.selectedApplication.form.pages.toString();
      if (appFeeElement) appFeeElement.textContent = `$${applicationFee}`;
      if (totalFeeElement) totalFeeElement.textContent = `$${totalFee}`;
    }
  }

  calculateFee(formType: string, pages: number): number {
    if (formType === 'tatkal' && pages === 36) return 3000;
    if (formType === 'tatkal' && pages === 60) return 4000;
    if (formType === 'normal' && pages === 36) return 1500;
    if (formType === 'normal' && pages === 60) return 2000;
    return 0;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
      // Handle form submission logic here
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  handlePaymentMethodChange(selectedPaymentMethod: string): void {
    this.paymentForm.get('ccNumber')?.clearValidators();
    this.paymentForm.get('ccExpiry')?.clearValidators();
    this.paymentForm.get('ccCvc')?.clearValidators();
    this.paymentForm.get('paypalEmail')?.clearValidators();
    this.paymentForm.get('upiId')?.clearValidators();

    if (selectedPaymentMethod === 'credit-card') {
      this.paymentForm.get('ccNumber')?.setValidators([Validators.required, Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)]);
      this.paymentForm.get('ccExpiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)]);
      this.paymentForm.get('ccCvc')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]);
    } else if (selectedPaymentMethod === 'paypal') {
      this.paymentForm.get('paypalEmail')?.setValidators([Validators.required, Validators.email]);
    } else if (selectedPaymentMethod === 'upi') {
      this.paymentForm.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^\d{10}@[a-zA-Z]{3}$/)]);
    }

    this.paymentForm.get('ccNumber')?.updateValueAndValidity();
    this.paymentForm.get('ccExpiry')?.updateValueAndValidity();
    this.paymentForm.get('ccCvc')?.updateValueAndValidity();
    this.paymentForm.get('paypalEmail')?.updateValueAndValidity();
    this.paymentForm.get('upiId')?.updateValueAndValidity();
  }
}
