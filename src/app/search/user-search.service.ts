import { Injectable } from '@angular/core';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserFromSearch } from '../models/user-from-search';
import { InstagramApiService } from '../instagram-api.service'

@Injectable()
export class UserSearchService {

    constructor(
        private apiService: InstagramApiService
    ) { }

    private searchUserUrl = `/users/search`;

    search(value: string): Observable<UserFromSearch[]> {
        let params = new URLSearchParams();
        params.set("q", value);

        return this.apiService.get(this.searchUserUrl, params)
            .map(u => this.extractUser(u));
    }

    extractUser(response: Response): UserFromSearch[] {
        let json = response.json();
        return (json.data || {}) as UserFromSearch[];
    }
}