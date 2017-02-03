import { Observable } from 'rxjs/Observable';

import { FeedProviderService } from './feed-provider.service';
import { Media } from './models/media';

export class MediaFeedProviderService extends FeedProviderService {
    constructor(
        resolveNext: () => Observable<Media>
    ) {
        super();

        this.sbj
            .exhaustMap(resolveNext)
            .subscribe(i => this.receivedElement(i));
    }

    protected latestId: string;

    protected updateLatest(item: Media): void {
        this.latestId = item.id as string;
    }

    private receivedElement(item: Media): void {
        this.updateLatest(item);

        if (this.subscribtionFunction) {
            this.subscribtionFunction(item);
        }
    }
}