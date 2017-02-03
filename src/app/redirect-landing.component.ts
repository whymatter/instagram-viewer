import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InstagramCredentials } from './instagram-credentials'

@Component({
    template: `
        <div *ngIf="error" class="alert alert-danger" role="alert">
            <b>{{error}}:</b> {{errorDescription}}
        </div>

        <div *ngIf="!error" class="alert alert-success" role="alert">
            Authenticated!
        </div>
    `
})
export class RedirectLanding implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private credentials: InstagramCredentials) { }

    errorReason: String;
    error: String;
    errorDescription: String;

    ngOnInit(): void {
        this.errorReason = this.route.snapshot.queryParams['error_reason'];
        this.error = this.route.snapshot.queryParams['error'];
        this.errorDescription = this.route.snapshot.queryParams['error_description'];

        let accessToken = this.route.snapshot.fragment;
        if (accessToken) {
            accessToken = accessToken.split("=")[1];

            this.credentials.setAccessToken(accessToken);
            setTimeout(() => this.router.navigateByUrl(''), 1000);
        }
    }

}