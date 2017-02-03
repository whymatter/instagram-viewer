import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Media } from './models/media';
import { Pagination } from './models/pagination';
import { InstagramApiService } from './instagram-api.service';

@Injectable()
export class TagFeedService {

    constructor(
        private apiService: InstagramApiService
    ) { }

    getMediaFrom(tag: string, maxId?: string): Observable<Media|Pagination> {
        let params = new URLSearchParams();
        if (maxId) params.set("max_tag_id", maxId);
        params.set("count", "1");

        return this.apiService
            .get(`/tags/${tag}/media/recent/`, params)
            .map(this.extractMedia)
            .concatMap(x => x);
    }

    extractMedia(response: Response): (Media | Pagination)[] {
        let json = response.json();
        let medias: (Media|Pagination)[] = ((json.data || []) as any []).map(x => (new Media as any)._deserialize(x));

        let pagination = json.pagination;
        if (pagination)
            medias.push(new Pagination(pagination.next_max_tag_id));

        return medias;
    }

}