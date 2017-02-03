import { Injectable } from '@angular/core';

import { UserFeedService } from './user-feed.service';
import { MediaFeedProviderService } from './media-feed-provider.service';

@Injectable()
export class UserSelfProviderService extends MediaFeedProviderService {
    constructor(
        private userFeedService: UserFeedService
    ) {
        super(() => this.userFeedService
            .getRecentMediaSelf(this.latestId));
    }
}