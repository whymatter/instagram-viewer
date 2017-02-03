import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { InstagramCredentials } from './instagram-credentials';
import { InstagramUrlGenerator } from './instagram-url-generator';

@Injectable()
export class RedirectResolver {
    constructor(
        private credentials: InstagramCredentials,
        private generator: InstagramUrlGenerator, ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        window.location.href = this.generator.authenticationUrlFor(this.credentials);
    }
}