import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FreshApplicationComponent } from './fresh-application/fresh-application.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FreshApplicationComponent } from './components/fresh-passport-application/fresh-application/fresh-application.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FaqComponent } from './components/faq/faq.component';
import { HistoryComponent } from './components/history/history.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { TAndCComponent } from './components/t-and-c/t-and-c.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  // { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      }
      , {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'appointment' , component: AppointmentComponent
      }
      ,
      {
        path: 'fresh-application', component: FreshApplicationComponent
      },
      {
        path: 'payment', component: PaymentComponent
      },
      {
        path: 'FAQs', component: FaqComponent
      },
      {
        path: 'history', component: HistoryComponent
      },
      {
        path: 'contact-us', component: ContactComponent
      },
      {
        path: 't&c', component: TAndCComponent
      },
      {
        path: 'about-us', component: AboutUsComponent
      },
      {
        path: 'privacy-policy', component: PrivacyPolicyComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
