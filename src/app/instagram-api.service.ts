import { Http, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';

import { InstagramUrlGenerator } from './instagram-url-generator'

@Injectable()
export class InstagramApiService {

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private urlGenerator: InstagramUrlGenerator
    ) { }

    get(path: String, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
        let url = this.urlGenerator.generateApi(path, params);
        return this.jsonp.get(url as string, { search: params });
    }
}