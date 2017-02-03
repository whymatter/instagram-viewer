import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InstagramCredentials } from './instagram-credentials';
import { Media } from './models/media';
import { FeedItemDetail } from './feed-item-detail.component';

@Component({
    selector: 'feed-item',
    templateUrl: 'feed-item.component.html',
    moduleId: "" + module.id,
    styles: [
        `
            img {
                width: 100%;
            }
        `
    ],
    animations: [
        trigger('likeState', [
            state('noLike', style({
                color: '#333'
            })),
            state('like', style({
                color: '#ff0000'
            })),
            transition('noLike <=> like', animate('100ms ease-in-out'))
        ])
    ]
})
export class FeedItem implements OnInit {

    @Input()
    media: Media;

    constructor(
        private router: Router,
        private credentials: InstagramCredentials,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void { }

    writeComment(comment: String): void {

    }

    showBig(): any {
        this.modalService.open(FeedItemDetail).componentInstance.media = this.media;
    }

    likeState(): string {
        return this.media.user_has_liked ? "like" : "noLike";
    }

    toggleLike(): void {
        this.media.user_has_liked = !this.media.user_has_liked;
    }

}