import { UserFeedService } from './user-feed.service';
import { MediaFeedProviderService } from './media-feed-provider.service';

export class UserProviderService extends MediaFeedProviderService {
    constructor(
        private userFeedService: UserFeedService,
        private userId: string
    ) {
        super(() => this.userFeedService
            .getRecentMediaFrom(this.userId, this.latestId));
    }
}