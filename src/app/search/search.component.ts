import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { UserSearchService } from './user-search.service';
import { TagSearchService } from './tag-search.service';
import { UserFromSearch } from '../models/user-from-search';
import { TagFromSearch } from '../models/tag-from-search';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    moduleId: "" + module.id
})
export class Search implements OnInit {
    private sbj: Subject<string>;

    users: UserFromSearch[];
    tags: TagFromSearch[];
    blured: boolean;

    constructor(
        private userSearch: UserSearchService,
        private tagSearch: TagSearchService
    ) {
        this.sbj = new Subject<string>();
    }

    ngOnInit(): void {
        let buffered = this.sbj
            .debounceTime(100)
            .distinctUntilChanged();

        buffered
            .switchMap(v => this.userSearch.search(v))
            .subscribe(u => this.userResultIncome(u));

        buffered
            .switchMap(v => this.tagSearch.search(v))
            .subscribe(u => this.tagResultIncome(u));
    }

    search(value: string) {
        if (value)
            this.sbj.next(value);
        else {
            this.users.length = 0;
            this.tags.length = 0;
        }
    }

    userResultIncome(users: UserFromSearch[]): void {
        this.users = users.slice(0, 5);
    }

    tagResultIncome(tags: TagFromSearch[]): void {
        this.tags = tags.slice(0, 5);
    }

}