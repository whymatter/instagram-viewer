import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Media } from './models/media';

@Injectable()
export abstract class FeedProviderService {
    protected sbj: Subject<any>;
    protected subscribtionFunction: (item: Media) => void;

    constructor() {
        this.sbj = new Subject();
    }

    next(): void {
        this.sbj.next();
    }

    subscribe(s: (item: Media) => void): void {
        this.subscribtionFunction = s;
    }
}