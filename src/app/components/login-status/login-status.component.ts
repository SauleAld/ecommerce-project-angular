import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
// import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;
  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
     // Subscribe to authentication state changes

     this.oktaAuthService.$authenticationState.subscribe(

      (result) => {

        this.isAuthenticated = result;

        this.getUserDetails();
      }
    );
  }



  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;
          const userEmail = res.email;
          this.storage.setItem('userEmail', JSON.stringify(userEmail));
        }
      );
    }
  }

  logout() {

    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }
}
