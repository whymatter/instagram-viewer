import { Component, OnInit } from '@angular/core';

import { Media } from './models/media';

@Component({
    selector: 'feed-item-detail',
    templateUrl: 'feed-item-detail.component.html',
    styleUrls: ['feed-item-detail.component.css'],
    moduleId: "" + module.id,
})
export class FeedItemDetail implements OnInit {
    constructor() { }

    media: Media;

    ngOnInit(): void { }

}