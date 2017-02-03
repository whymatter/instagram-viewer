import { Injectable } from '@angular/core';

import { InstagramCredentials } from './instagram-credentials';
import { clientId } from './client-id';

@Injectable()
export class DefaultInstagramCredentials implements InstagramCredentials {
    clientId: String;
    private accessToken: String;

    constructor() {
        this.clientId = clientId;
    }

    getAccessToken(): String {
        if (!this.accessToken)
            this.accessToken = localStorage.getItem("access_token");

        return this.accessToken;
    }

    setAccessToken(value: String) {
        localStorage.setItem("access_token", (this.accessToken = value) as string);
    }
}