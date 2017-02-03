import { Injectable } from '@angular/core';
import { URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TagFromSearch } from '../models/tag-from-search';
import { InstagramApiService } from '../instagram-api.service'

@Injectable()
export class TagSearchService {

    constructor(
        private apiService: InstagramApiService
    ) { }

    private searchTagUrl = `/tags/search`;

    search(value: string): Observable<TagFromSearch[]> {
        let params = new URLSearchParams();
        params.set("q", value);

        return this.apiService.get(this.searchTagUrl, params)
            .map(u => this.extractTag(u));
    }

    extractTag(response: Response): TagFromSearch[] {
        let json = response.json();
        return (json.data || {}) as TagFromSearch[];
    }
}