import { TagFeedService } from './tag-feed.service';
import { Observable } from 'rxjs/Observable';
import { MediaFeedProviderService } from './media-feed-provider.service';

import { Media } from './models/media';
import { Pagination } from './models/pagination';

export class TagProviderService extends MediaFeedProviderService {

    endMarker = "END";

    constructor(
        private tagFeedService: TagFeedService,
        private tagId: string
    ) {
        super(() => {
            if (this.latestId === this.endMarker)
                return Observable.empty<Media>();

            let obs = this.tagFeedService
                .getMediaFrom(this.tagId, this.latestId).publish();

            obs.connect();

            obs
                .filter(x => x instanceof Pagination)
                .subscribe(x => {
                    this.latestId = (x as Pagination).nextId
                    if (!this.latestId) this.latestId = this.endMarker;
                });

            return obs.filter(x => x instanceof Media);
        });
    }

    protected updateLatest(item: Media): void { }

}