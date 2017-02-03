import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { InstagramCredentials } from './instagram-credentials';
import { UserFeedService } from './user-feed.service';
import { TagFeedService } from './tag-feed.service';
import { Media } from './models/media';
import { UserSelfProviderService } from './user-self-provider.service';
import { UserProviderService } from './user-provider.service';
import { TagProviderService } from './tag-provider.service';
import { FeedProviderService } from './feed-provider.service';

@Component({
    selector: 'feed',
    templateUrl: 'feed.component.html',
    moduleId: "" + module.id
})
export class Feed implements OnInit {

    mediaItems: Media[] = new Array<Media>();
    private feedProvider: FeedProviderService;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private credentials: InstagramCredentials,
        private userFeedService: UserFeedService,
        private tagFeedService: TagFeedService
    ) { }

    ngOnInit(): void {
        if (!this.credentials.getAccessToken()) {
            this.router.navigateByUrl('auth/login');
            return;
        }

        this.route.params.subscribe(
            p => this.resubscribeFeed(p['id'], p['type'])
        )
    }

    resubscribeFeed(id: string, type: string) {
        this.mediaItems.length = 0;

        if (type === 'user') {
            if (id === 'self') {
                this.feedProvider =
                    new UserSelfProviderService(this.userFeedService);
            } else {
                this.feedProvider =
                    new UserProviderService(this.userFeedService, id);
            }
        } else if (type === 'tag') {
            this.feedProvider =
                new TagProviderService(this.tagFeedService, id);
        }

        this.feedProvider.subscribe(i => this.mediaItems.push(i));
        this.feedProvider.next();
    }

    load(): void {
        this.feedProvider.next();
    }

}