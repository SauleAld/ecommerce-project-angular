import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
// import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myappConfig from 'src/app/config/myapp-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn: any;

  constructor(private oktaAuthService: OktaAuthService) {
    
    this.oktaSignIn = new OktaSignIn({

      logo: 'assets/images/logo.png',
      features: {
        registration: true
      },
      baseUrl: myappConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myappConfig.oidc.clientId,
      redirectUri: myappConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myappConfig.oidc.issuer,
        scopes: myappConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignIn.remove();



    this.oktaSignIn.renderEl({

      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html

      (response) => {

        if (response.status === 'SUCCESS') {

          this.oktaAuthService.signInWithRedirect();

        }

      },

      (error) => {

        throw error;

      }

    );
  }

}
