import { Injector, Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { InstagramCredentials } from './instagram-credentials'

@Injectable()
export class InstagramUrlGenerator {

    constructor(
        private injector: Injector
    ) { }

    authenticationUrlFor(credentials: InstagramCredentials) {
        let returnUrl = 'http://localhost:8080/auth/redirect';

        return 'https://api.instagram.com/oauth/authorize/?' +
            `client_id=${credentials.clientId}&` +
            `redirect_uri=${returnUrl}&` +
            'response_type=token&' +
            'scope=basic+public_content+follower_list+comments+relationships+likes';
    }

    generateApi(path: String, params: URLSearchParams = new URLSearchParams()): String {
        let credentials: InstagramCredentials =
            this.injector.get(InstagramCredentials);

        if (!credentials.getAccessToken()) {
            throw Error('access_token missing');
        }

        params.set("access_token", credentials.getAccessToken() as string);
        params.set("callback", "JSONP_CALLBACK");

        return `https://api.instagram.com/v1${path}`;
    }
}