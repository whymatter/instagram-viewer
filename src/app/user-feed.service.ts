import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Media } from './models/media';
import { InstagramApiService } from './instagram-api.service';
import { Deserialisation } from './deserialisation';

@Injectable()
export class UserFeedService {

    constructor(
        private apiService: InstagramApiService
    ) { }

    getRecentMediaFrom(userId: string, maxId?: string): Observable<Media> {
        let params = new URLSearchParams();
        if (maxId) params.set("max_id", maxId);
        params.set("count", "1");

        return this.apiService
            .get(`/users/${userId}/media/recent/`, params)
            .map(this.extractMedia)
            .concatMap(x => x);
    }

    getRecentMediaSelf(maxId?: string): Observable<Media> {
        return this.getRecentMediaFrom("self", maxId);
    }

    extractMedia(response: Response): Media[] {
        let json = response.json();
        return ((json.data || {}) as any[]).map(x => Deserialisation.d<Media>(Media, x));
    }

}