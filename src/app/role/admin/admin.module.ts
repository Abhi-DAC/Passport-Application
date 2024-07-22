import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FreshApplicationComponent } from './fresh-application/fresh-application.component';


@NgModule({
  declarations: [
    FreshApplicationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
