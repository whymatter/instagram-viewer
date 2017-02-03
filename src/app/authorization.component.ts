import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { InstagramCredentials } from './instagram-credentials';
import { InstagramUrlGenerator } from './instagram-url-generator';

@Component({
    selector: 'authorisation',
    template: `
    
    <p>You may log in to authorize angular to use your account:</p>
    <button class="btn btn-secondary" routerLink="/redirectInstagram" >Log in</button>
    
    `
})
export class Authorisation {
    constructor(
        private router: Router,
        private credentials: InstagramCredentials
    ) {
        if (credentials.getAccessToken()) {
            this.router.navigateByUrl('');
        }
    }
}