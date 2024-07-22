import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../../../../service/session-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
@Input() data!:boolean;
@Output() dataChange: EventEmitter<boolean> = new EventEmitter<boolean>();
showModel = false;
constructor(private toastr:ToastrService,private sessionStorage:SessionStorageService   ,private router: Router,private elementRef: ElementRef){
}

  toggleSidebar() {
    this.data = !this.data;
    console.log(this.data);
   this.dataChange.emit(this.data);
  }


  openLogoutModule() {
    this.showModel = true;
  }

  closeLogoutModel() {
    this.showModel = false;
  }

  logout() {
   this.closeLogoutModel()
    // Show success notification
    this.sessionStorage.clear();

    this.toastr.success('You have been logged out successfully', 'Logout');

    // Navigate to the login page
    this.router.navigate(['home']);
  }
}
