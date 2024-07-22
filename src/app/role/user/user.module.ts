import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
// import { FreshApplicationComponent } from './fresh-application/fresh-application.component';
// import { ServiceRequiredComponent } from './fresh-application/service-required/service-required.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { ApplicantDetailsComponent } from './fresh-application/applicant-details/applicant-details.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FreshApplicationComponent } from './components/fresh-passport-application/fresh-application/fresh-application.component';
import { ServiceRequiredComponent } from './components/fresh-passport-application/service-required/service-required.component';
import { ApplicantDetailsComponent } from './components/fresh-passport-application/applicant-details/applicant-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HistoryComponent } from './components/history/history.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TAndCComponent } from './components/t-and-c/t-and-c.component';
// import { FreshPassportApplicationComponent } from './components/fresh-passport-application/fresh-passport-application.component';
// import { FreshApplicationComponent } from './components/fresh-passport-application/fresh-application/fresh-application.component';


@NgModule({
  declarations: [
    // FreshApplicationComponent,
    ServiceRequiredComponent,
    ApplicantDetailsComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FreshApplicationComponent,
    ProfileComponent,
    PaymentComponent,
    HistoryComponent,
    FaqComponent,
    ContactComponent,
    AppointmentComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TAndCComponent
    // FreshApplicationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    RouterOutlet
  ]
})
export class UserModule { }
